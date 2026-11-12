"""Build reviewable MP3 files from the Kokoro job list on stdin."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
from tempfile import TemporaryDirectory

OUT = Path(sys.argv[1])
jobs = json.load(sys.stdin)
OUT.mkdir(parents=True, exist_ok=True)
manifest_file = OUT / "manifest.json"
manifest = json.loads(manifest_file.read_text()) if manifest_file.exists() else {}
pending = []
for job in jobs:
    clip_id = job["id"]
    if not re.fullmatch(r"[0-9]+-(?:[we][0-9]+|[ls])", clip_id):
        raise ValueError(f"Unexpected clip ID: {clip_id}")
    digest = hashlib.sha256(json.dumps(
        ["kokoro-0.9.4", "hexgrad/Kokoro-82M", "24k-mp3-0.32-gap-v1", job],
        sort_keys=True, ensure_ascii=False
    ).encode()).hexdigest()
    if manifest.get(clip_id) != digest or not (OUT / f"{clip_id}.mp3").is_file():
        pending.append((job, digest))

if not pending:
    print("All audio clips are current.")
    sys.exit()

import numpy as np
import soundfile as sf
from kokoro import KPipeline

pipeline = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M", device="cpu")
with TemporaryDirectory(dir=OUT) as tmp:
    scratch = Path(tmp)
    for job, digest in pending:
        clip_id = job["id"]
        segments = []
        for part in job["parts"]:
            if segments:
                segments.append(np.zeros(7680, dtype=np.float32))
            chunks = [result.audio.numpy() for result in pipeline(
                part["text"], voice=part["voice"], speed=1
            ) if result.audio is not None]
            if not chunks or not any(np.any(chunk) for chunk in chunks):
                raise ValueError(f"No audio returned for {clip_id}")
            segments.extend(chunks)
        wav = scratch / "clip.wav"
        mp3 = scratch / f"{clip_id}.mp3"
        sf.write(wav, np.concatenate(segments), 24000)
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i",
                        str(wav), "-c:a", "libmp3lame", "-b:a", "96k", str(mp3)], check=True)
        mp3.replace(OUT / mp3.name)
        manifest[clip_id] = digest
        new_manifest = scratch / "manifest.json"
        new_manifest.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
        new_manifest.replace(manifest_file)
        print(clip_id)
