const listening01 = [
 ['Hello!', 'Bạn nghe thấy lời chào nào?', ['Hello!', 'Goodbye!', 'Thank you!'], 0],
 ['Good morning!', 'Người nói đang chào vào thời điểm nào?', ['Buổi tối', 'Buổi sáng', 'Buổi chiều'], 1],
 ['My name is Anna.', 'Người nói tên là gì?', ['Emma', 'Amy', 'Anna'], 2],
 ['How are you?', 'Người nói đang hỏi điều gì?', ['Bạn khỏe không?', 'Bạn tên gì?', 'Bạn ở đâu?'], 0],
 ["I'm fine, thank you.", 'Người nói cảm thấy thế nào?', ['Buồn', 'Khỏe', 'Mệt'], 1],
 ['Goodbye, Tom!', 'Người nói đang làm gì?', ['Hỏi tên', 'Cảm ơn', 'Chào tạm biệt'], 2],
 ['Good evening, everyone!', 'Bạn nghe thấy lời chào nào?', ['Good evening', 'Good afternoon', 'Good morning'], 0],
 ['Nice to meet you.', 'Câu nói có nghĩa là gì?', ['Hẹn gặp lại', 'Rất vui được gặp bạn', 'Chúc ngủ ngon'], 1],
 ['See you later!', 'Người nói muốn diễn đạt điều gì?', ['Xin lỗi', 'Chào buổi sáng', 'Hẹn gặp lại'], 2],
 ['Good afternoon, Sarah!', 'Người nói đang chào vào thời điểm nào?', ['Buổi chiều', 'Buổi sáng', 'Buổi tối'], 0],
 ['Hello, my name is Ben.', 'Hello, my name is ____.', 'Ben'],
 ['Good morning, Anna!', 'Good ____, Anna!', 'morning'],
 ['How are you?', 'How ____ you?', 'are'],
 ["I'm fine, thank you.", "I'm ____, thank you.", 'fine'],
 ['Nice to meet you.', 'Nice to ____ you.', 'meet'],
 ['Goodbye, Emma!', '____, Emma!', 'Goodbye'],
 ['What is your name?', 'What is your ____?', 'name'],
 ['Good evening, Tom!', 'Good ____, Tom!', 'evening'],
 ['See you later!', 'See you ____!', 'later'],
 ['Thank you, Sarah!', '____ you, Sarah!', 'Thank'],
];

const listening01Clip = index => 'listening_01_' + String(index+1).padStart(2, '0');
const listening01Attempts = [null, null];

function listening01Page() {
 return [
  ['Listen & Choose', 'Nghe audio rồi chọn một trong ba đáp án.', 0],
  ['Listen & Fill in the Blanks', 'Nghe audio rồi nhập một từ còn thiếu. Có thể viết chữ hoa hoặc chữ thường.', 1],
 ].map(([title, instruction, part]) => {
  const attempt = listening01Attempts[part];
  const offset = part*10;
  const exercises = listening01.slice(offset,offset+10).map(([script, prompt, options], index)=>{
   const n = offset+index;
   const result = attempt?.results[index];
   const field = part
    ? '<input type="text" required autocomplete="off" spellcheck="false" lang="en" name="q'+index+'" aria-label="Câu '+(n+1)+'. '+esc(prompt)+'" value="'+esc(result?.value)+'">'
    : options.map((option,i)=>'<label class="choice"><input type="radio" required name="q'+index+'" value="'+i+'" '+(result?.value===String(i)?'checked':'')+'> '+'ABC'[i]+'. '+esc(option)+'</label>').join('');
   return '<fieldset class="exercise stack"><legend>Câu '+(n+1)+'</legend>'+
    '<audio controls preload="none" aria-label="Audio '+(n+1)+'" src="'+audioUrl(listening01Clip(n))+'"></audio>'+
    '<p '+(part?'lang="en"':'')+'>'+esc(prompt)+'</p>'+field+
    '<p data-listening-feedback class="feedback '+(result?.ok?'ok':'')+'">'+esc(result?.message)+'</p>'+
    '<p class="example" lang="en" data-listening-script '+(attempt?.showScript?'':'hidden')+'>'+esc(script)+'</p></fieldset>';
  }).join('');
  return '<section class="panel stack"><h2>Part '+(part+1)+'. '+title+'</h2><p>'+instruction+'</p>'+
   '<form class="stack" data-listening-part="'+part+'"><p data-listening-count aria-live="polite">'+(attempt?'10':'0')+'/10 câu đã trả lời</p>'+exercises+
   '<div class="actions"><button class="button primary" type="submit">Chấm điểm</button>'+
   '<button class="button outline" type="button" data-listening-toggle '+(attempt?'':'disabled')+'>'+(attempt?.showScript?'Ẩn script':'Hiện script')+'</button>'+
   '<button class="button outline" type="reset">Làm lại</button></div>'+
   '<p data-listening-score role="status" tabindex="-1">'+(attempt?attempt.score+'/10 câu đúng':'')+'</p></form></section>';
 }).join('');
}

document.addEventListener('play', event=>{
 const audio = event.target;
 if (audio instanceof HTMLAudioElement && audio.closest('[data-listening-part]')) {
  document.querySelectorAll('[data-listening-part] audio').forEach(other=>{if(other!==audio)other.pause()});
 }
}, true);

document.addEventListener('submit', event=>{
 const form = event.target;
 if (form.dataset.listeningPart === undefined) return;
 event.preventDefault();
 const part = Number(form.dataset.listeningPart);
 const data = new FormData(form);
 const results = listening01.slice(part*10,part*10+10).map(([, , options, correct], i)=>{
  const value = String(data.get('q'+i)??'');
  const ok = part ? value.trim().toLowerCase()===options.toLowerCase() : value===String(correct);
  return {value,ok,message:ok?'Đúng!':'Đáp án: '+(part?options:options[correct])};
 });
 const missing = results.findIndex(({value})=>!value.trim());
 const status = form.querySelector('[data-listening-score]');
 if (missing !== -1) {
  status.textContent = 'Trả lời đủ 10 câu trước khi chấm điểm.';
  form.querySelector('[name="q'+missing+'"]').focus();
  return;
 }
 const score = results.filter(({ok})=>ok).length;
 listening01Attempts[part] = {results,score,showScript:false};
 form.querySelectorAll('[data-listening-feedback]').forEach((node,i)=>{
  node.textContent=results[i].message;
  node.classList.toggle('ok',results[i].ok);
 });
 listening01ShowScripts(form,false);
 form.querySelector('[data-listening-toggle]').disabled=false;
 status.textContent=score+'/10 câu đúng';
 status.focus();
});

function listening01ShowScripts(form, visible) {
 form.querySelectorAll('[data-listening-script]').forEach(node=>node.hidden=!visible);
 form.querySelector('[data-listening-toggle]').textContent=visible?'Ẩn script':'Hiện script';
}

document.addEventListener('click', event=>{
 const toggle=event.target.closest('[data-listening-toggle]');
 if (!toggle) return;
 const form=toggle.form;
 const attempt=listening01Attempts[Number(form.dataset.listeningPart)];
 if (attempt) listening01ShowScripts(form,attempt.showScript=!attempt.showScript);
});

function listening01ClearScore(form) {
 listening01Attempts[Number(form.dataset.listeningPart)]=null;
 form.querySelectorAll('[data-listening-feedback]').forEach(node=>{
  node.textContent='';
  node.classList.remove('ok');
 });
 form.querySelector('[data-listening-score]').textContent='';
 form.querySelector('[data-listening-toggle]').disabled=true;
 listening01ShowScripts(form,false);
}

document.addEventListener('input',event=>{
 const form=event.target.form;
 if (form?.dataset.listeningPart === undefined) return;
 const count=Array.from(new FormData(form).values()).filter(value=>value.trim()).length;
 form.querySelector('[data-listening-count]').textContent=count+'/10 câu đã trả lời';
 if (listening01Attempts[Number(form.dataset.listeningPart)]) listening01ClearScore(form);
});

document.addEventListener('reset',event=>{
 const form=event.target;
 if (form.dataset.listeningPart === undefined) return;
 event.preventDefault();
 form.querySelectorAll('input').forEach(input=>{
  if(input.type==='radio')input.checked=false;
  else input.value='';
 });
 form.querySelectorAll('audio').forEach(audio=>{audio.pause(); audio.currentTime=0});
 form.querySelector('[data-listening-count]').textContent='0/10 câu đã trả lời';
 listening01ClearScore(form);
 form.querySelector('input').focus();
});
