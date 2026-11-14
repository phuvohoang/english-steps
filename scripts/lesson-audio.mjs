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
jobs.push(...[
  {
    "id": "listening_01_01",
    "parts": [
      {
        "text": "Hello!",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_02",
    "parts": [
      {
        "text": "Good morning!",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_03",
    "parts": [
      {
        "text": "My name is Anna.",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_04",
    "parts": [
      {
        "text": "How are you?",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_05",
    "parts": [
      {
        "text": "I'm fine, thank you.",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_06",
    "parts": [
      {
        "text": "Goodbye, Tom!",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_07",
    "parts": [
      {
        "text": "Good evening, everyone!",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_08",
    "parts": [
      {
        "text": "Nice to meet you.",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_09",
    "parts": [
      {
        "text": "See you later!",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_10",
    "parts": [
      {
        "text": "Good afternoon, Sarah!",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_11",
    "parts": [
      {
        "text": "Hello, my name is Ben.",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_12",
    "parts": [
      {
        "text": "Good morning, Anna!",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_13",
    "parts": [
      {
        "text": "How are you?",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_14",
    "parts": [
      {
        "text": "I'm fine, thank you.",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_15",
    "parts": [
      {
        "text": "Nice to meet you.",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_16",
    "parts": [
      {
        "text": "Goodbye, Emma!",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_17",
    "parts": [
      {
        "text": "What is your name?",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_18",
    "parts": [
      {
        "text": "Good evening, Tom!",
        "voice": "am_michael"
      }
    ]
  },
  {
    "id": "listening_01_19",
    "parts": [
      {
        "text": "See you later!",
        "voice": "af_heart"
      }
    ]
  },
  {
    "id": "listening_01_20",
    "parts": [
      {
        "text": "Thank you, Sarah!",
        "voice": "am_michael"
      }
    ]
  }
]);
process.stdout.write(JSON.stringify(jobs, null, 2) + '\n');
