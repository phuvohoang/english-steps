"""Check that every requested lesson clip was generated and can be decoded."""
import json
from pathlib import Path
import subprocess
import sys

jobs = json.loads(Path(sys.argv[1]).read_text())
audio = Path(sys.argv[2])
manifest = json.loads((audio / "manifest.json").read_text())
ids = {job["id"] for job in jobs}
if not ids or len(ids) != len(jobs) or not ids <= manifest.keys():
    raise ValueError("Incomplete audio manifest or duplicate clip IDs")
for clip_id in sorted(ids):
    subprocess.run([
        "ffmpeg", "-nostdin", "-v", "error", "-xerror", "-i",
        str(audio / f"{clip_id}.mp3"), "-map", "0:a:0", "-f", "null", "-"
    ], check=True)
print(f"Validated {len(ids)} MP3 files.")
