"use strict";
const paths={book:'<path d="M3 5a2 2 0 0 1 2-2h14v18H5a2 2 0 0 1-2-2V5Zm0 14a2 2 0 0 1 2-2h14M7 7h8m-8 4h5"/>',home:'<path d="m3 10 9-7 9 7v10H3V10Zm6 10v-7h6v7"/>',cards:'<rect x="6" y="6" width="15" height="15" rx="2"/><path d="M3 16V5a2 2 0 0 1 2-2h11m-6 8h7m-7 4h4"/>',repeat:'<path d="M20 7H6l3-3M4 17h14l-3 3M4 12V9a2 2 0 0 1 2-2m14 5v3a2 2 0 0 1-2 2"/>',plus:'<path d="M12 5v14M5 12h14"/>',right:'<path d="M4 12h15m-6-6 6 6-6 6"/>',chevron:'<path d="m9 6 6 6-6 6"/>',check:'<path d="m5 12 4 4L19 6"/>',sound:'<path d="M4 10v4h4l4 4V6l-4 4H4Zm11-1a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v5a7 7 0 0 1-13 4l-3-4a1.5 1.5 0 0 1 2-2l2 1Z"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/>',heart:'<path d="M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6l-8 8Z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',cup:'<path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm12 1h2a2 2 0 0 1 0 4h-2M3 21h15M8 3v2m4-2v2"/>',pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',star:'<path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.2-5.5-3-5.5 3 1.1-6.2-4.5-4.4 6.2-.9L12 3Z"/>',edit:'<path d="m4 16-1 5 5-1L20 8l-4-4L4 16Zm9-9 4 4"/>',trash:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15m-8 4v7m4-7v7"/>',download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',upload:'<path d="M12 16V4M8 8l4-4 4 4M4 16v5h16v-5"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>'};
const icon=name=>'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
const app=document.querySelector('#app'), dialog=document.querySelector('#dialog'), importInput=document.querySelector('#import');
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=value=>value.normalize('NFC').toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?,]+$/g,'').trim().replace(/\s+/g,' ');
const day=86400000, tabs=['Từ vựng','Ngữ pháp','Nghe','Nói','Viết'], defaultDeck='Từ của tôi';
const empty=()=>({words:[],decks:[defaultDeck],progress:{}});
let db,state, storageError='', noticeTimer, review=null, query='', deckFilter='', playing, busy=false;
const feedbacks=new Map();
function openDatabase(){
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open('english-steps-mvp',1);
  request.onupgradeneeded=()=>request.result.createObjectStore('profile');
  request.onsuccess=()=>resolve(request.result);
  request.onerror=request.onblocked=()=>reject(request.error||new Error('IndexedDB'));
 });
}
function readProfile(){
 return new Promise((resolve,reject)=>{
  const request=db.transaction('profile').objectStore('profile').get('main');
  request.onsuccess=()=>resolve(request.result||empty());
  request.onerror=()=>reject(request.error);
 });
}
async function update(change){
 if(!db||busy)return false;
 busy=true;
 try{
  state=await new Promise((resolve,reject)=>{
   const tx=db.transaction('profile','readwrite'), store=tx.objectStore('profile'), request=store.get('main');
   let updated;
   request.onsuccess=()=>{updated=request.result||empty();change(updated);store.put(updated,'main')};
   tx.oncomplete=()=>resolve(updated);
   tx.onabort=()=>reject(tx.error||new Error('IndexedDB'));
  });
  return true;
 }catch{toast('Không lưu được. Hãy thử lại.');return false}
 finally{busy=false}
}
const doneCount=()=>Object.values(state.progress).filter(p=>p.done).length;
const dueWords=()=>state.words.filter(w=>w.due<=Date.now());
const button=(label,action,options={})=>'<button type="button" class="button '+(options.cls||'outline')+'" data-action="'+action+'"'+(options.value!==undefined?' data-value="'+esc(options.value)+'"':'')+(options.disabled?' disabled':'')+'>'+(options.icon?icon(options.icon):'')+esc(label)+'</button>';
const mini=(label,action,glyph,value)=>'<button type="button" class="icon-button" aria-label="'+esc(label)+'" title="'+esc(label)+'" data-action="'+action+'" data-value="'+esc(value)+'">'+icon(glyph)+'</button>';
const link=(label,hash,cls='outline',glyph)=>'<a class="button '+cls+'" href="#'+hash+'">'+esc(label)+(glyph?icon(glyph):'')+'</a>';
const route=()=>location.hash.slice(1).split('/');
function toast(message){const node=document.querySelector('#toast');node.textContent=message;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>node.textContent='',3500)}
function nextLesson(){const i=lessons.findIndex((_,i)=>!state.progress[i]?.done);return i<0?lessons.length-1:i}
function lessonHref(i){return 'bai/'+i+'/'+(state.progress[i]?.tab||0)}
function layout(content,page,active){
 const nav=[['','home','Tổng quan'],['lo-trinh','book','Lộ trình'],['so-tu','cards','Sổ từ của tôi'],['on-tu','repeat','Ôn từ']];
 app.innerHTML='<div class="shell"><aside class="sidebar"><a href="#" class="brand"><span class="brand-mark">'+icon('book')+'</span>English Steps</a><nav class="nav" aria-label="Điều hướng">'+nav.map(([hash,glyph,label])=>'<a href="#'+hash+'"'+(hash===active?' aria-current="page"':'')+'>'+icon(glyph)+label+'</a>').join('')+'</nav><div class="side-note">'+icon('cards')+'<span>Sổ từ và tiến độ được lưu trên trình duyệt này.</span></div></aside><main id="main"><div class="wrap"><header class="topbar"><span class="crumb">'+page+'</span><span class="level">A0 → A1</span></header>'+(storageError?'<p class="error">'+storageError+'</p>':'')+content+'</div></main></div>';
}
const lessonCard=(l,i)=>'<a class="lesson-card" href="#'+lessonHref(i)+'"><span class="bubble '+l.color+'">'+icon(l.icon)+'</span><div class="lesson-copy"><small>'+(i===6?'ÔN TẬP':'BÀI '+(i+1))+' · '+l.time+' PHÚT</small><h3>'+l.title+'</h3><p lang="en">'+l.en+'</p></div>'+(state.progress[i]?.done?'<span class="pill done">Đã học</span>':icon('chevron'))+'</a>';
function dashboard(){
 const next=nextLesson(), finished=doneCount()===lessons.length;
 const stat=(glyph,color,number,label)=>'<div class="stat"><span class="bubble '+color+'">'+icon(glyph)+'</span><div><strong>'+number+'</strong><span>'+label+'</span></div></div>';
 layout('<section class="hero"><div class="hero-text"><h1>Tiếng Anh từ đầu,<br>từng bước một.</h1><p>Học qua những tình huống quen thuộc và lưu từ mới vào sổ riêng để ôn mỗi ngày.</p>'+link(finished?'Ôn lại tuần 1':doneCount()||state.progress[next]?.tab?'Học tiếp':'Bắt đầu học',lessonHref(next),'primary','right')+'</div><div class="hero-art" aria-hidden="true"><div class="orbit"><span class="art-card art-a">Aa</span><span class="art-card art-b">'+icon('sound')+'</span><span class="spark">✦</span><span class="spark two">✧</span></div></div></section><section class="stats" aria-label="Tiến độ">'+stat('check','lilac',doneCount()+' / '+lessons.length,'Bài hoàn thành')+stat('cards','mint',state.words.length,'Từ đã lưu')+stat('repeat','peach',dueWords().length,'Từ đến hạn ôn')+'</section><div class="section-head"><div><h2>Lộ trình học</h2><p>Tuần 1 · Bắt đầu với tiếng Anh</p></div>'+link('Xem tất cả','lo-trinh','outline small','right')+'</div><div class="lesson-list">'+lessons.slice(0,4).map(lessonCard).join('')+'</div>','Tổng quan','');
}
const heading=(title,desc)=>'<header class="subhead"><h1 class="page-title">'+title+'</h1><p class="muted">'+desc+'</p></header>';
function roadmap(){
 layout(heading('Lộ trình học','Tuần 1 · 6 bài theo chủ đề và 1 bài ôn tập.')+'<div class="panel"><div class="spread"><h3>Tiến độ tuần 1</h3><span class="pill">'+doneCount()+'/'+lessons.length+' bài</span></div><div class="meter top-space" role="progressbar" aria-label="Tiến độ tuần 1" aria-valuenow="'+doneCount()+'" aria-valuemax="'+lessons.length+'"><span style="width:'+doneCount()/lessons.length*100+'%"></span></div></div><div class="lesson-list">'+lessons.map(lessonCard).join('')+'</div>','Lộ trình','lo-trinh');
}
function stopSpeech(){playing?.pause();playing=null;document.querySelectorAll('audio').forEach(audio=>audio.pause())}
const audioUrl = name => './audio/' + name + '.mp3?v=kokoro-1';
function playFile(name){stopSpeech();playing=new Audio(audioUrl(name));playing.play().catch(()=>toast('Không phát được audio. Hãy thử lại.'))}
function checkForm(items,type,key){
 const prev=feedbacks.get(key);
 return '<form class="stack" data-form="quiz" data-type="'+type+'" data-key="'+key+'">'+items.map(([prompt,answer],i)=>{
  const result=prev?.[i];
  const options=Array.isArray(answer)?answer.map((value,index)=>({value,index})).sort((a,b)=>(a.index+i+Number(key[0])+2)%answer.length-(b.index+i+Number(key[0])+2)%answer.length):null;
  return '<fieldset class="exercise"><legend>'+esc(prompt)+'</legend>'+(options?options.map(({value,index})=>'<label class="choice"><input type="radio" required name="q'+i+'" value="'+index+'" '+(result?.value===String(index)?'checked':'')+'> '+esc(value)+'</label>').join(''):'<input aria-label="'+esc(prompt)+'" type="text" required name="q'+i+'" value="'+esc(result?.value)+'" autocomplete="off" placeholder="Nhập câu trả lời">')+'<div class="feedback '+(result?.ok?'ok':'')+'" aria-live="polite" data-feedback="'+i+'">'+esc(result?.message)+'</div></fieldset>';
 }).join('')+'<div><button class="button primary" type="submit">Kiểm tra đáp án</button></div></form>';
}
function lessonPage(i,step){
 const l=lessons[i], key=i+'-'+step, p=state.progress[i]||{};
 let body='';
 if(step===0)body='<section class="panel"><h2>Từ vựng</h2><p class="muted">Nghe từ và câu ví dụ. Lưu những từ bạn muốn ôn.</p>'+l.words.map(([word,meaning,example],j)=>{
  const saved=state.words.some(w=>normalize(w.word)===normalize(word)&&normalize(w.meaning)===normalize(meaning));
  return '<div class="row word-row"><div><strong lang="en">'+esc(word)+'</strong><p>'+esc(meaning)+'</p><p class="example" lang="en">'+esc(example)+'</p></div><div class="actions">'+mini('Nghe từ','audio','sound',i+'-w'+j)+mini('Nghe câu ví dụ','audio','book',i+'-e'+j)+button(saved?'Đã lưu':'Lưu từ','save-lesson',{value:i+'-'+j,cls:'small '+(saved?'soft':'outline'),icon:saved?'check':'plus',disabled:saved})+'</div></div>';
 }).join('')+'</section>';
 if(step===1)body='<section class="panel"><h2>'+esc(l.rule)+'</h2><p>'+esc(l.explain)+'</p></section><section class="panel"><h2>Bài tập ngữ pháp</h2>'+checkForm(l.quiz,'grammar',key)+'</section>';
 if(step===2)body='<section class="panel"><h2>Nghe đoạn hội thoại</h2><p class="muted">Bạn có thể nghe nhiều lần trước khi trả lời.</p><audio controls preload="metadata" src="'+audioUrl(i+'-l')+'" aria-label="Hội thoại"></audio><div class="actions">'+button('Chậm 0.75×','speed',{value:'0.75',cls:'outline small'})+button('Bình thường 1×','speed',{value:'1',cls:'outline small'})+'</div></section><section class="panel">'+checkForm([l.listen],'listen',key)+'<details '+(feedbacks.has(key)?'':'hidden')+' id="transcript"><summary>Lời thoại và bản dịch</summary><div class="stack"><div lang="en">'+l.script.map(line=>'<p>'+esc(line)+'</p>').join('')+'</div><p class="muted">'+esc(l.translation)+'</p></div></details></section>';
 if(step===3)body='<section class="panel stack"><div><h2>Luyện nói</h2><p>'+esc(l.speak)+'</p></div><p class="example" lang="en">'+esc(l.model)+'</p><div class="actions">'+button('Nghe câu mẫu','audio',{value:i+'-s',icon:'sound'})+'</div><p class="muted">Nghe và nhại theo. Sau đó nói lại bằng thông tin của bạn.</p></section>';
 if(step===4)body='<section class="panel stack"><div><h2>Luyện viết</h2><p>'+esc(l.write)+'</p></div><form class="stack" data-form="writing" data-id="'+i+'"><label class="field">Câu trả lời của bạn<textarea required maxlength="2000" name="draft" placeholder="Viết bằng tiếng Anh…">'+esc(p.draft)+'</textarea></label><div><button class="button outline" type="submit">Lưu bài viết</button></div></form><details><summary>Xem bài mẫu và tự kiểm tra</summary><p lang="en">'+esc(l.sample)+'</p><p class="muted">'+esc(l.checks)+'</p></details></section>';
 const footer='<div class="spread footer-actions">'+(step?link('Phần trước','bai/'+i+'/'+(step-1)):link('Lộ trình','lo-trinh'))+(step<4?link('Phần tiếp theo','bai/'+i+'/'+(step+1),'primary','right'):button(p.done?'Về lộ trình':'Hoàn thành bài','finish',{value:i,cls:'primary',icon:'check'}))+'</div>';
 layout(heading(l.title,(i===6?'Ôn tập':'Bài '+(i+1))+' · '+l.time+' phút · '+l.intro)+'<nav class="tabs" aria-label="Các phần của bài">'+tabs.map((title,j)=>'<a class="button '+(step===j?'soft':'outline')+'" '+(step===j?'aria-current="step"':'')+' href="#bai/'+i+'/'+j+'">'+(j+1)+'. '+title+'</a>').join('')+'</nav>'+body+footer,'Bài học','lo-trinh');
}
function wordRows(){
 const matches=state.words.filter(w=>(!deckFilter||w.deck===deckFilter)&&[w.word,w.meaning,w.example,w.note].some(s=>normalize(s).includes(normalize(query))));
 if(!matches.length)return '<div class="empty"><span class="bubble">'+icon('cards')+'</span><h3>'+(query||deckFilter?'Không có từ phù hợp':'Sổ từ còn trống')+'</h3><p class="muted">Thêm từ của bạn hoặc lưu từ ngay trong bài học.</p></div>';
 return matches.map(w=>'<div class="row word-row"><div><strong lang="en">'+esc(w.word)+'</strong><p>'+esc(w.meaning)+'</p>'+(w.example?'<p class="example" lang="en">'+esc(w.example)+'</p>':'')+(w.note?'<p class="muted">'+esc(w.note)+'</p>':'')+'<p class="muted">'+esc(w.deck)+' · '+(w.due<=Date.now()?'Đến hạn ôn':'Ôn '+new Date(w.due).toLocaleDateString('vi-VN'))+'</p></div><div class="actions">'+mini('Nghe phát âm','say-word','sound',w.id)+mini('Sửa từ','edit-word','edit',w.id)+mini('Xóa từ','delete-word','trash',w.id)+'</div></div>').join('');
}
function notebook(){
 layout('<div class="spread">'+heading('Sổ từ của tôi','Tự thêm, sắp xếp và luyện những từ bạn muốn nhớ.')+button('Thêm từ','new-word',{cls:'primary',icon:'plus'})+'</div><div class="panel"><div class="actions tools"><input type="text" id="search" placeholder="Tìm từ hoặc nghĩa…" aria-label="Tìm trong sổ từ" value="'+esc(query)+'"><select id="deck-filter" aria-label="Lọc theo bộ từ"><option value="">Tất cả bộ từ</option>'+state.decks.map(d=>'<option '+(d===deckFilter?'selected':'')+'>'+esc(d)+'</option>').join('')+'</select>'+button('Tạo bộ từ','new-deck',{icon:'plus'})+'</div><div id="word-rows">'+wordRows()+'</div></div><div class="actions">'+link('Luyện ghi nhớ','on-tu','primary','right')+button('Xuất bản sao','export',{icon:'download'})+button('Nhập bản sao','import',{icon:'upload'})+'</div>','Sổ từ','so-tu');
}
const searchText = value => normalize(value).normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/g,'d');
function lookupRows(query){
 const key=searchText(query);
 if(!key)return '';
 const results=lessons.flatMap((lesson,i)=>lesson.words.map(([word,meaning,example],j)=>({word,meaning,example,id:i+'-w'+j})))
  .filter(item=>[item.word,item.meaning].some(value=>searchText(value).includes(key)));
 const unique=[...new Map(results.reverse().map(item=>[item.word+'|'+item.meaning,item])).values()].reverse();
 if(!unique.length)return '<p class="muted">Chưa có trong kho bài học. Bạn có thể nhập từ và nghĩa bên dưới.</p>';
 return unique.slice(0,8).map(item=>'<div class="row word-row"><div><strong lang="en">'+esc(item.word)+'</strong><p>'+esc(item.meaning)+'</p><p class="example" lang="en">'+esc(item.example)+'</p></div><div class="actions">'+mini('Nghe từ','audio','sound',item.id)+button('Chọn','lookup-select',{value:item.id,cls:'small outline'})+'</div></div>').join('');
}
function wordDialog(w={},source){
 dialog.innerHTML='<form class="stack" data-form="word" data-id="'+esc(w.id)+'" data-source="'+esc(source??w.audio)+'"><div class="spread"><h2>'+(w.id?'Sửa từ':'Thêm từ vào sổ')+'</h2>'+mini('Đóng','close','close','')+'</div>'+(!w.id&&!source?'<label class="field">Tra Anh ↔ Việt<input id="lookup-word" type="text" autocomplete="off" placeholder="Ví dụ: live hoặc sống"></label><div id="lookup-results" aria-live="polite"></div>':'')+'<label class="field">Từ hoặc cụm từ tiếng Anh<input type="text" name="word" required maxlength="140" value="'+esc(w.word)+'"></label><label class="field">Nghĩa tiếng Việt<input type="text" name="meaning" required maxlength="180" value="'+esc(w.meaning)+'"></label><label class="field">Câu ví dụ<input type="text" name="example" maxlength="300" value="'+esc(w.example)+'"></label><label class="field">Ghi chú<input type="text" name="note" maxlength="300" value="'+esc(w.note)+'"></label><label class="field">Bộ từ<select name="deck">'+state.decks.map(d=>'<option '+(d===(w.deck||deckFilter)?'selected':'')+'>'+esc(d)+'</option>').join('')+'</select></label><button class="button primary" type="submit">Lưu từ</button></form>';
 dialog.showModal();
}
function reviewPage(){
 const w=review&&state.words.find(item=>item.id===review.ids[review.index]);
 let body;
 if(!review){
  body=heading('Ôn từ','Luyện nhớ từ trong sổ của bạn.')+'<form class="panel stack" data-form="start-review"><div class="spread"><h2>Chọn cách luyện</h2><span class="pill">'+dueWords().length+' từ đến hạn</span></div><label class="field">Bộ từ<select name="deck"><option value="">Tất cả bộ từ</option>'+state.decks.map(d=>'<option '+(d===deckFilter?'selected':'')+'>'+esc(d)+'</option>').join('')+'</select></label><label class="field">Từ muốn luyện<select name="scope"><option value="due">Đến hạn ôn</option><option value="all">Tất cả từ</option><option value="wrong">Từ đã trả lời sai</option></select></label><label class="field">Kiểu luyện<select name="mode"><option value="flip">Lật thẻ Anh → Việt</option><option value="type">Nhìn nghĩa, gõ tiếng Anh</option><option value="hear">Nghe và gõ lại</option></select></label><label class="choice"><input type="checkbox" name="shuffle"> Xáo thứ tự thẻ</label><div><button type="submit" class="button primary" '+(state.words.length?'':'disabled')+'>Bắt đầu ôn</button></div></form>'+(state.words.length?'':'<p class="muted">Bạn cần thêm ít nhất một từ vào sổ để bắt đầu.</p>'+link('Mở sổ từ','so-tu','outline'));
 }else if(!w){
  body='<section class="panel flash"><div class="empty"><span class="bubble mint">'+icon('check')+'</span><h2>Đã ôn '+review.index+' từ</h2><p class="muted">Lịch ôn đã được cập nhật cho các thẻ vừa luyện.</p><div class="actions top-space">'+button('Ôn tiếp','review-reset',{cls:'primary'})+link('Về sổ từ','so-tu')+'</div></div></section>';
 }else{
  const prompt=review.mode==='flip'?w.word:review.mode==='type'?w.meaning:'Nghe từ rồi gõ lại';
  body='<section class="panel flash"><div class="spread"><span class="pill">Thẻ '+(review.index+1)+'/'+review.ids.length+'</span>'+button('Kết thúc','review-reset',{cls:'outline small'})+'</div><div class="meter" role="progressbar" aria-label="Tiến độ phiên ôn" aria-valuenow="'+review.index+'" aria-valuemax="'+review.ids.length+'"><span style="width:'+review.index/review.ids.length*100+'%"></span></div><p class="prompt" '+(review.mode==='flip'?'lang="en"':'')+'>'+esc(prompt)+'</p>'+(review.mode==='type'&&!review.revealed?'':button('Nghe từ','say-word',{value:w.id,icon:'sound'}))+(review.revealed?'<div class="reveal" aria-live="polite"><strong lang="en">'+esc(w.word)+'</strong><p>'+esc(w.meaning)+'</p>'+(w.example?'<p class="example" lang="en">'+esc(w.example)+'</p>':'')+(review.result?'<p class="feedback '+(review.result.ok?'ok':'')+'">'+(review.result.ok?'Chính xác.':'Bạn đã nhập “'+esc(review.result.typed)+'”.')+'</p>':'')+'</div><div class="actions">'+button('Quên','grade',{value:0})+button('Còn lúng túng','grade',{value:1,cls:'soft'})+button('Đã nhớ','grade',{value:2,cls:'primary'})+'</div>':(review.mode==='flip'?'':'<form data-form="review-answer"><input type="text" name="answer" required autocomplete="off" aria-label="Từ tiếng Anh" placeholder="Nhập tiếng Anh"><button class="button primary" type="submit">Kiểm tra</button></form>')+'<div class="actions top-space">'+button('Hiện đáp án','reveal',{cls:review.mode==='flip'?'primary':'outline'})+'</div>')+'</section>';
 }
 layout(body,'Ôn từ','on-tu');
}
function render(){
 const [page,id,tab]=route();
 if(page==='bai'&&/^\d$/.test(id)&&lessons[Number(id)])lessonPage(Number(id),/^[0-4]$/.test(tab)?Number(tab):0);
 else if(page==='lo-trinh')roadmap();
 else if(page==='so-tu')notebook();
 else if(page==='on-tu')reviewPage();
 else dashboard();
}
function exportData(){
 const url=URL.createObjectURL(new Blob([JSON.stringify({format:'english-steps',version:1,...state},null,2)],{type:'application/json'}));
 const anchor=document.createElement('a');anchor.href=url;anchor.download='english-steps-backup.json';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function validBackup(data){
 const validText=(s,max,required=false)=>typeof s==='string'&&s.length<=max&&(!required||!!s.trim());
 return data?.format==='english-steps'&&data.version===1&&Array.isArray(data.decks)&&data.decks.length<=500&&data.decks.every(d=>validText(d,50,true))&&Array.isArray(data.words)&&data.words.length<=10000&&data.words.every(w=>w&&validText(w.id,100,true)&&validText(w.word,140,true)&&validText(w.meaning,180,true)&&validText(w.example,300)&&validText(w.note,300)&&data.decks.includes(w.deck)&&Number.isFinite(w.due)&&w.due>=0&&w.due<=8640000000000000&&Number.isInteger(w.interval)&&w.interval>=0&&w.interval<=60&&typeof w.wrong==='boolean'&&(!w.audio||/^[0-6]-w[0-5]$/.test(w.audio)))&&data.progress&&typeof data.progress==='object'&&!Array.isArray(data.progress)&&Object.entries(data.progress).every(([id,p])=>/^[0-6]$/.test(id)&&p&&Number.isInteger(p.tab)&&p.tab>=0&&p.tab<=4&&(p.done===undefined||typeof p.done==='boolean')&&(p.draft===undefined||validText(p.draft,2000)));
}
importInput.addEventListener('change',async()=>{
 const file=importInput.files[0];importInput.value='';if(!file)return;
 let data;
 try{if(file.size>10000000)throw Error();data=JSON.parse(await file.text());if(!validBackup(data))throw Error()}
 catch{toast('Tệp không phải bản sao English Steps hợp lệ.');return}
 if(await update(profile=>{
  profile.decks=[...new Set([...profile.decks,...data.decks])];
  const keys=new Set(profile.words.map(w=>JSON.stringify([normalize(w.word),normalize(w.meaning),w.deck])));
  const ids=new Set(profile.words.map(w=>w.id));
  for(const w of data.words){
   const key=JSON.stringify([normalize(w.word),normalize(w.meaning),w.deck]);
   if(keys.has(key)||ids.has(w.id))continue;
   const {id,word,meaning,example,note,deck,due,interval,wrong,audio}=w;
   profile.words.push({id,word,meaning,example,note,deck,due,interval,wrong,audio});
   keys.add(key);ids.add(id);
  }
  for(const [id, incoming] of Object.entries(data.progress)){
   const current=profile.progress[id];
   profile.progress[id]=current?{tab:current.tab,done:!!(current.done||incoming.done),draft:current.draft??incoming.draft}:{tab:incoming.tab,done:!!incoming.done,draft:incoming.draft};
  }
 })){render();toast('Đã gộp bản sao với dữ liệu hiện có.')}
});
function sayWord(w){if(w?.audio)playFile(w.audio);else if(w)toast("Từ này chưa có clip phát âm.")}
document.addEventListener('click',async event=>{
 const target=event.target.closest('[data-action]');if(!target)return;
 const {action,value}=target.dataset;
 if(action==='audio')playFile(value);
 if(action==='say-word')sayWord(state.words.find(w=>w.id===value));
 if(action==='speed'){
  const audio=document.querySelector('audio');stopSpeech();audio.playbackRate=Number(value);
  audio.play().catch(()=>toast('Không phát được hội thoại. Hãy thử lại.'));
 }
 if(action==='close')dialog.close();
 if(action==='new-word')wordDialog();
 if(action==='edit-word'){const w=state.words.find(w=>w.id===value);if(w)wordDialog(w)}
 if(action==='delete-word'){
  const w=state.words.find(w=>w.id===value);if(!w)return;
  dialog.innerHTML='<form class="stack" data-form="delete" data-id="'+esc(w.id)+'"><h2>Xóa từ khỏi sổ?</h2><p>'+esc(w.word)+' sẽ bị xóa cùng lịch ôn của từ này.</p><div class="actions">'+button('Hủy','close')+'<button class="button outline danger">Xóa từ</button></div></form>';
  dialog.showModal();
 }
 if(action==='new-deck'){
  dialog.innerHTML='<form class="stack" data-form="deck"><div class="spread"><h2>Tạo bộ từ</h2>'+mini('Đóng','close','close','')+'</div><label class="field">Tên bộ từ<input type="text" name="name" required maxlength="50" placeholder="Ví dụ: Tiếng Anh đi làm"></label><button class="button primary">Tạo bộ từ</button></form>';
  dialog.showModal();
 }
 if(action==='lookup-select'){
  const match=/^([0-6])-w([0-5])$/.exec(value);
  if(!match)return;
  const [word,meaning,example]=lessons[match[1]].words[match[2]];
  const form=dialog.querySelector('form');
  form.elements.word.value=word;
  form.elements.meaning.value=meaning;
  form.elements.example.value=example;
  form.dataset.source=value;
  form.elements.word.focus();
 }
 if(action==='save-lesson'){
  const [i,j]=value.split('-').map(Number),[word,meaning,example]=lessons[i].words[j];
  wordDialog({word,meaning,example},i+'-w'+j);
 }
 if(action==='export')exportData();
 if(action==='import')importInput.click();
 if(action==='finish'){
  const draft=document.querySelector('textarea')?.value.trim();
  if(await update(profile=>{profile.progress[value]={...profile.progress[value],tab:4,done:true,...(draft?{draft}:{})}})){location.hash='lo-trinh';toast('Đã hoàn thành bài.')}
 }
 if(action==='review-reset'){review=null;stopSpeech();render()}
 if(action==='reveal'&&review){review.revealed=true;render()}
 if(action==='grade'&&review){
  const id=review.ids[review.index], grade=Number(value), missed=review.result?.ok===false;
  if(await update(profile=>{
   const w=profile.words.find(item=>item.id===id);if(!w)return;
   const interval=grade===0?0:grade===1?1:w.interval<2?3:Math.min(60,w.interval*2);
   Object.assign(w,{interval,due:Date.now()+(grade===0?600000:interval*day),wrong:grade===0||missed||(grade===1&&w.wrong)});
  })){review.index++;review.revealed=false;review.result=null;stopSpeech();render()}
 }
});
document.addEventListener('submit',async event=>{
 const form=event.target, type=form.dataset.form;if(!type)return;
 event.preventDefault();
 const data=new FormData(form), read=name=>String(data.get(name)??'').trim(), id=form.dataset.id;
 if(type==='word'){
  const word=read('word'), meaning=read('meaning'), deck=read('deck');
  if(!word||!meaning){toast('Nhập từ tiếng Anh và nghĩa tiếng Việt.');return}
  let duplicate=false;
  if(await update(profile=>{
   duplicate=profile.words.some(w=>w.id!==id&&w.deck===deck&&normalize(w.word)===normalize(word)&&normalize(w.meaning)===normalize(meaning));
   if(duplicate)return;
   const previous=profile.words.find(w=>w.id===id);
   const source=form.dataset.source;
   const sourceMatch=/^([0-6])-w([0-5])$/.exec(source);
   const audio=sourceMatch&&normalize(lessons[sourceMatch[1]].words[sourceMatch[2]][0])===normalize(word)?source:undefined;
   const w={id:id||crypto.randomUUID(),word,meaning,example:read('example'),note:read('note'),deck,due:previous?.due??Date.now(),interval:previous?.interval??0,wrong:previous?.wrong??false,audio};
   if(previous)profile.words[profile.words.indexOf(previous)]=w;else profile.words.push(w);
  })){
   if(duplicate){toast('Từ và nghĩa này đã có trong bộ từ.');return}
   dialog.close();render();toast('Đã lưu từ vào sổ.');
  }
 }
 if(type==='deck'){
  const name=read('name');if(!name){toast('Nhập tên bộ từ.');return}
  let duplicate=false;
  if(await update(profile=>{duplicate=profile.decks.some(d=>normalize(d)===normalize(name));if(!duplicate)profile.decks.push(name)})){
   if(duplicate){toast('Tên bộ từ đã tồn tại.');return}
   deckFilter=name;dialog.close();render();toast('Đã tạo bộ từ.');
  }
 }
 if(type==='delete'&&await update(profile=>{profile.words=profile.words.filter(w=>w.id!==id)})){dialog.close();render();toast('Đã xóa từ.')}
 if(type==='writing'){
  const draft=read('draft');if(!draft){toast('Nhập câu trả lời của bạn.');return}
  if(await update(profile=>{profile.progress[id]={...profile.progress[id],tab:4,draft}}))toast('Đã lưu bài viết.');
 }
 if(type==='quiz'){
  const key=form.dataset.key, lesson=lessons[Number(key[0])], isListen=form.dataset.type==='listen';
  const items=isListen?[lesson.listen]:lesson.quiz;
  const results=items.map(([,answer,why],i)=>{
   const value=read('q'+i), options=Array.isArray(answer), ok=options?value==='0':normalize(value)===normalize(answer);
   return {value,ok,message:(ok?'Đúng! ':'Đáp án: '+(options?answer[0]:answer)+'. ')+(why??'')};
  });
  feedbacks.set(key,results);
  results.forEach((r,i)=>{const element=form.querySelector('[data-feedback="'+i+'"]');element.textContent=r.message;element.classList.toggle('ok',r.ok)});
  if(isListen)document.querySelector('#transcript').hidden=false;
 }
 if(type==='start-review'){
  const deck=read('deck'), scope=read('scope'), now=Date.now();
  const mode=data.get('mode');
  const words=state.words.filter(w=>(mode!=='hear'||w.audio)&&(!deck||w.deck===deck)&&(scope==='all'||(scope==='due'&&w.due<=now)||(scope==='wrong'&&w.wrong)));
  if(!words.length){toast('Không có từ phù hợp với lựa chọn này.');return}
  if(data.has('shuffle'))for(let i=words.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[words[i],words[j]]=[words[j],words[i]]}
  review={ids:words.map(w=>w.id),index:0,mode:read('mode'),revealed:false,result:null};render();
 }
 if(type==='review-answer'&&review){
  const w=state.words.find(item=>item.id===review.ids[review.index]),typed=read('answer');
  if(!w||!typed)return;
  review.result={typed,ok:normalize(typed)===normalize(w.word)};review.revealed=true;render();
 }
});
document.addEventListener('input',event=>{if(event.target.id==='lookup-word')document.querySelector('#lookup-results').innerHTML=lookupRows(event.target.value);if(event.target.id==='search'){query=event.target.value;document.querySelector('#word-rows').innerHTML=wordRows()}});
document.addEventListener('change',event=>{if(event.target.id==='deck-filter'){deckFilter=event.target.value;document.querySelector('#word-rows').innerHTML=wordRows()}});
async function navigate(){
 stopSpeech();if(dialog.open)dialog.close();
 const [page,id,tab]=route();
 if(page!=='on-tu')review=null;
 render();window.scrollTo(0,0);
 if(page==='bai'&&/^\d$/.test(id)&&lessons[Number(id)]&&/^[0-4]$/.test(tab)&&state.progress[id]?.tab!==Number(tab))
  await update(profile=>{profile.progress[id]={...profile.progress[id],tab:Number(tab)}});
}
(async()=>{
 try{db=await openDatabase();state=await readProfile()}
 catch{db=null;state=empty();storageError='Trình duyệt không mở được nơi lưu dữ liệu. Bạn vẫn có thể đọc và luyện bài. Hãy mở trong trình duyệt thường để lưu tiến độ.'}
 app.removeAttribute('aria-busy');
 window.addEventListener('hashchange',navigate);
 await navigate();
})();
