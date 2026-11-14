'use strict';

const selectionSave = document.createElement('button');
selectionSave.type = 'button';
selectionSave.className = 'button primary small selection-save';
selectionSave.textContent = 'Lưu từ';
selectionSave.hidden = true;
document.body.append(selectionSave);

let selectedWord, pressedWord, selectionFrame;

function hideWordSelection() {
 selectionSave.hidden = true;
 selectedWord = null;
}

function selectedEnglishWord() {
 const selection = window.getSelection();
 if (selection?.rangeCount !== 1 || selection.isCollapsed || dialog.open) return null;

 const range = selection.getRangeAt(0);
 const start = range.startContainer;
 const element = start.nodeType === Node.ELEMENT_NODE ? start : start.parentElement;
 const english = element?.closest('[lang]');
 if (english?.lang !== 'en' || !english.closest('#main') ||
     !english.contains(range.endContainer) || english.closest('form,button,a')) return null;

 const word = range.toString().trim();
 if (!/^[a-z]+(?:['’\u2011-][a-z]+)*$/i.test(word)) return null;

 // Check boundaries across inline markup such as the highlighted word in an example.
 const prefix = document.createRange();
 prefix.selectNodeContents(english);
 prefix.setEnd(range.startContainer, range.startOffset);
 const startOffset = prefix.toString().length + range.toString().search(/\S/);
 const text = english.textContent;
 const isWordPart = char => /[\p{L}\p{M}'’\u2011-]/u.test(char || '');
 if (isWordPart(text[startOffset - 1]) || isWordPart(text[startOffset + word.length])) return null;

 return {word, english, rect:range.getBoundingClientRect()};
}

function showWordSelection() {
 if (pressedWord) return;
 const match = route()[0] === 'bai' && selectedEnglishWord();
 if (!match || match.rect.bottom <= 0 || match.rect.top >= window.innerHeight) {
  hideWordSelection();
  return;
 }

 selectedWord = match;
 selectionSave.hidden = false;
 const {width,height} = selectionSave.getBoundingClientRect();
 const {left, right, top, bottom} = match.rect;
 const x = Math.min(window.innerWidth - width - 8, Math.max(8, (left + right - width) / 2));
 const y = top >= height + 8 ? top - height - 6 : bottom + 6;
 selectionSave.style.left = x + 'px';
 selectionSave.style.top = Math.min(y, window.innerHeight - height - 8) + 'px';
}

function selectionWordEntry({word, english}) {
 const key = normalize(word);
 const row = Array.from(document.querySelectorAll('#main .grammar-words tbody tr')).find(row =>
  row.cells[0]?.scope === 'row' && row.cells[0].lang === 'en' &&
  normalize(row.cells[0].textContent) === key
 );
 const meaning = row?.cells[1]?.textContent.trim();
 const lessonIndex = Number(route()[1]);
 const indexes = [lessonIndex, ...lessons.keys()].filter(i => lessons[i]);
 for (const i of indexes) {
  const j = lessons[i].words.findIndex(([candidate, translation]) =>
   normalize(candidate) === key && (!meaning || translation === meaning)
  );
  if (j !== -1) {
   const [candidate, translation, example] = lessons[i].words[j];
   return {entry:{word:candidate, meaning:translation, example}, source:i+'-w'+j};
  }
 }
 const example = english.closest('.example')?.textContent.trim();
 return {entry:{word:row?.cells[0].textContent.trim() || word, meaning, example}};
}

document.addEventListener('selectionchange', ()=>{
 cancelAnimationFrame(selectionFrame);
 selectionFrame = requestAnimationFrame(showWordSelection);
});
document.addEventListener('pointerdown', event=>{
 if (event.target === selectionSave) pressedWord = selectedWord;
 else {
  pressedWord = null;
  hideWordSelection();
 }
});
selectionSave.addEventListener('mousedown', event=>event.preventDefault());
selectionSave.addEventListener('pointercancel', ()=>{
 pressedWord = null;
 showWordSelection();
});
selectionSave.addEventListener('click', ()=>{
 const match = pressedWord || selectedWord;
 pressedWord = null;
 hideWordSelection();
 if (!match?.english.isConnected) return;
 const {entry,source} = selectionWordEntry(match);
 window.getSelection()?.removeAllRanges();
 wordDialog(entry,source);
});
document.addEventListener('keydown', event=>{
 if (event.key === 'Escape') {
  pressedWord = null;
  hideWordSelection();
 }
});
window.addEventListener('hashchange', ()=>{
 pressedWord = null;
 hideWordSelection();
});
window.addEventListener('resize', showWordSelection);
window.addEventListener('scroll', showWordSelection, {passive:true});
