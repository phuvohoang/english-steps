import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../docs/lessons.js', import.meta.url), 'utf8');
const lessons = runInNewContext(source + '\nlessons', {}, {timeout: 1000});
const index = 1;
const lesson = lessons[index];
const tutor = 'af_heart';
const clarify = text => text.replace(/\blive\b/gi, '[live](/lɪv/)');
const jobs = lesson.words.flatMap(([word, , example], i) => [
  { id: index + '-w' + i, parts: [{ text: clarify(word) + '.', voice: tutor }] },
  { id: index + '-e' + i, parts: [{ text: clarify(example), voice: tutor }] }
]);
jobs.push(
  { id: index + '-s', parts: [{ text: lesson.model, voice: tutor }] },
  { id: index + '-l', parts: lesson.script.map((text, i) => ({
    text: clarify(text),
    voice: ['am_michael', tutor, 'am_michael'][i]
  })) }
);
process.stdout.write(JSON.stringify(jobs, null, 2) + '\n');
