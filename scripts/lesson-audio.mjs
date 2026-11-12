import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../docs/lessons.js', import.meta.url), 'utf8');
const lessons = runInNewContext(source + '\nlessons', {}, {timeout: 1000});
const tutor = 'af_heart';
const partner = 'am_michael';
const dialogueRoles = [
  [partner, tutor, partner], [partner, tutor, partner],
  [partner, partner, tutor], [partner, tutor, tutor],
  [partner, tutor, partner], [tutor, partner, tutor],
  [tutor, partner, tutor, partner],
];
const clarify = text => text.replace(/\blive\b/gi, '[live](/lɪv/)');
const jobs = lessons.flatMap((lesson, i) => {
  const roles = dialogueRoles[i];
  if (!roles || roles.length !== lesson.script.length) {
    throw new Error('Assign a voice to each dialogue turn in lesson ' + (i + 1));
  }
  const clip = (suffix, text) => ({
    id: i + '-' + suffix,
    parts: [{ text: clarify(text), voice: tutor }],
  });
  return [
    ...lesson.words.flatMap(([word, , example], j) => [
      clip('w' + j, word + '.'), clip('e' + j, example),
    ]),
    clip('s', lesson.model),
    { id: i + '-l', parts: lesson.script.map((text, j) => ({
      text: clarify(text), voice: roles[j],
    })) },
  ];
});
process.stdout.write(JSON.stringify(jobs, null, 2) + '\n');
