const grammar01Groups = [
 ['Nhận biết loại từ', [
  ["Từ ‘teacher’ thuộc loại từ nào?", 0, 'Teacher gọi tên một nghề nghiệp.'],
  ["Từ ‘eat’ thuộc loại từ nào?", 1, 'Eat diễn tả hành động ăn.'],
  ["Từ ‘beautiful’ thuộc loại từ nào?", 2, 'Beautiful mô tả đặc điểm đẹp.'],
  ["Từ ‘school’ thuộc loại từ nào?", 0, 'School gọi tên một địa điểm.'],
  ["Từ ‘sleep’ trong câu ‘I sleep’ là gì?", 1, 'Sleep diễn tả hành động ngủ.'],
  ["Từ ‘happy’ thuộc loại từ nào?", 2, 'Happy mô tả trạng thái vui vẻ.'],
  ["Từ ‘book’ trong câu ‘I read a book’ là gì?", 0, 'Book gọi tên một đồ vật.'],
  ["Từ ‘run’ trong câu ‘They run’ là gì?", 1, 'Run diễn tả hành động chạy.'],
  ["Từ ‘small’ thuộc loại từ nào?", 2, 'Small mô tả kích thước.'],
  ["Từ ‘student’ thuộc loại từ nào?", 0, 'Student gọi tên người đi học.'],
 ]],
 ['Xác định thành phần câu', [
  ["Trong câu ‘I eat rice’, đâu là chủ ngữ?", 2, 'I là người thực hiện hành động ăn.', ['rice', 'eat', 'I']],
  ["Trong câu ‘She drinks water’, đâu là động từ?", 0, 'Drinks chỉ hành động uống.', ['drinks', 'She', 'water']],
  ["Trong câu ‘They play football’, đâu là tân ngữ?", 1, 'Football cho biết họ chơi môn gì.', ['They', 'football', 'play']],
  ["Trong câu ‘He reads books’, đâu là chủ ngữ?", 2, 'He là người thực hiện hành động đọc.', ['reads', 'books', 'He']],
  ["Trong câu ‘I like music’, đâu là động từ?", 0, 'Like diễn tả sự yêu thích.', ['like', 'music', 'I']],
 ]],
 ['Chọn câu đúng', [
  ['Chọn câu có thứ tự từ đúng.', 1, 'Thứ tự là chủ ngữ I, động từ eat, tân ngữ rice.', ['Eat I rice.', 'I eat rice.', 'Rice I eat.']],
  ['Chọn câu khẳng định đúng.', 0, 'Dùng She + is + tính từ happy.', ['She is happy.', 'She happy is.', 'Happy she is.']],
  ['Chọn câu đúng.', 2, 'Thứ tự là chủ ngữ They, động từ drink, tân ngữ water.', ['Water drink they.', 'Drink they water.', 'They drink water.']],
  ['Chọn câu khẳng định đúng.', 1, 'Dùng The cat + is + tính từ small.', ['The cat small is.', 'The cat is small.', 'Is the cat small.']],
 ]],
 ['Vận dụng', [
  ["Câu ‘I sleep’ có cần tân ngữ không?", 0, 'I là chủ ngữ và sleep là động từ. Hai thành phần này đã tạo thành câu hoàn chỉnh.', ['Không, câu đã hoàn chỉnh.', 'Có, mọi câu đều cần tân ngữ.', 'Cần thêm hai tân ngữ.']],
 ]],
];
const grammar01Kinds = ['Danh từ (Noun)', 'Động từ (Verb)', 'Tính từ (Adjective)'];
for (const [index, order] of [[4,[2,1,0]],[5,[2,0,1]],[6,[1,0,2]],[7,[2,0,1]],[8,[2,1,0]],[9,[1,0,2]]]) {
 const question = grammar01Groups[0][1][index];
 question[3] = order.map(kind => grammar01Kinds[kind]);
 question[1] = order.indexOf(question[1]);
}
const grammar01Questions = grammar01Groups.flatMap(([, questions]) => questions);
const grammar01PassingScore = 16;
const grammar01Prompts = [
 ['Viết một câu với động từ eat.', 'Tôi ăn cơm.', 'I eat rice.'],
 ['Viết một câu với động từ drink.', 'Tôi uống nước.', 'I drink water.'],
 ['Viết một câu với tính từ happy.', 'Tôi vui vẻ.', 'I am happy.'],
 ['Viết một câu với tính từ small.', 'Con mèo nhỏ.', 'The cat is small.'],
 ['Viết một câu có đủ S + V + O.', 'Cô ấy đọc sách.', 'She reads books.'],
];
const grammar01Words = (entries, groups = []) => '<table class="grammar-words"><thead><tr><th scope="col">Tiếng Anh</th><th scope="col">Nghĩa tiếng Việt</th>'+(groups.length?'<th scope="col">Nhóm</th>':'')+'</tr></thead><tbody>'+entries.map(([word, meaning], i) => '<tr><th scope="row" lang="en">'+esc(word)+'</th><td>'+esc(meaning)+'</td>'+(groups.length?'<td>'+esc(groups[i])+'</td>':'')+'</tr>').join('')+'</tbody></table>';

function grammar01Theory() {
 return `<section class="panel stack">
  <header><p class="muted">GRAMMAR A0 · LESSON 01</p><h2>Danh từ, động từ, tính từ và cấu trúc câu tiếng Anh</h2><p class="muted">Người mất gốc · 45–60 phút · 20 câu luyện tập</p></header>
  <div><h3>Mục tiêu bài học</h3><ul>
   <li>Phân biệt danh từ (Noun), động từ (Verb) và tính từ (Adjective).</li>
   <li>Hiểu chủ ngữ (Subject), động từ (Verb) và tân ngữ (Object).</li>
   <li>Nhận biết cấu trúc câu cơ bản và tự viết những câu tiếng Anh đơn giản.</li>
  </ul></div>
 </section>
 <section class="panel stack">
  <h2>Phần 1. Lý thuyết</h2>
  <div><h3>1. Danh từ (Noun) là gì?</h3><p><strong>Danh từ dùng để gọi tên người, con vật, đồ vật, địa điểm hoặc sự vật.</strong> Trong tiếng Việt, “giáo viên”, “con mèo” và “quyển sách” đều là danh từ.</p>
   ${grammar01Words([['teacher','giáo viên'],['student','học sinh'],['cat','con mèo'],['dog','con chó'],['book','quyển sách'],['phone','điện thoại'],['school','trường học'],['water','nước']], ['Người','Người','Con vật','Con vật','Đồ vật','Đồ vật','Địa điểm','Sự vật'])}
   <p class="example" lang="en">She is a <strong>teacher</strong>.</p><p>Cô ấy là một giáo viên. <strong>Teacher</strong> là danh từ chỉ nghề nghiệp.</p>
   <p class="example" lang="en">I have a <strong>book</strong>.</p><p>Tôi có một quyển sách. <strong>Book</strong> là danh từ chỉ đồ vật.</p>
   <p><strong>Mẹo ghi nhớ.</strong> Từ này có dùng để gọi tên người, vật hay địa điểm không? Nếu có, nó rất có thể là danh từ.</p>
  </div>
  <div><h3>2. Động từ (Verb) là gì?</h3><p><strong>Động từ diễn tả hành động hoặc trạng thái.</strong> Ăn, uống, ngủ, học và làm việc là những hành động quen thuộc.</p>
   ${grammar01Words([['eat','ăn'],['drink','uống'],['sleep','ngủ'],['study','học'],['work','làm việc'],['read','đọc'],['run','chạy'],['play','chơi']])}
   <p class="example" lang="en">I <strong>eat</strong> rice.</p><p>Tôi ăn cơm. <strong>Eat</strong> diễn tả hành động ăn.</p>
   <p class="example" lang="en">They <strong>play</strong> football.</p><p>Họ chơi bóng đá. <strong>Play</strong> diễn tả hành động chơi.</p>
   <p><strong>Lưu ý.</strong> <em lang="en">Am, is, are</em> cũng là động từ. Chúng dùng để nói về trạng thái, đặc điểm, danh tính hoặc vị trí. Bạn sẽ học kỹ hơn về chúng ở Bài 03 của lộ trình ngữ pháp.</p>
  </div>
  <div><h3>3. Tính từ (Adjective) là gì?</h3><p><strong>Tính từ mô tả đặc điểm, tính chất hoặc trạng thái của người, vật và sự việc.</strong></p>
   ${grammar01Words([['beautiful','đẹp'],['happy','vui vẻ'],['sad','buồn'],['big','to, lớn'],['small','nhỏ'],['tired','mệt mỏi'],['good','tốt'],['new','mới']])}
   <p class="example" lang="en">The cat is <strong>small</strong>.</p><p>Con mèo nhỏ. <strong>Small</strong> mô tả kích thước của con mèo.</p>
   <p class="example" lang="en">She is <strong>happy</strong>.</p><p>Cô ấy vui vẻ. <strong>Happy</strong> mô tả trạng thái của cô ấy.</p>
   <h4>Hai vị trí thường gặp của tính từ</h4>
   <ul><li><strong>Trước danh từ.</strong> <span lang="en">a big house</span> (một ngôi nhà lớn), <span lang="en">a small cat</span> (một con mèo nhỏ), <span lang="en">a beautiful girl</span> (một cô gái đẹp).</li>
   <li><strong>Sau động từ <i lang="en">to be</i>.</strong> <span lang="en">The house is big.</span> (Ngôi nhà lớn.), <span lang="en">The cat is small.</span> (Con mèo nhỏ.), <span lang="en">She is beautiful.</span> (Cô ấy đẹp.)</li></ul>
   <p>Trong tiếng Việt, ta nói “một ngôi nhà lớn”. Trong cụm danh từ tiếng Anh thông thường, tính từ đứng trước danh từ. Hãy nhớ <span lang="en">a <strong>big house</strong></span>.</p>
  </div>
  <div><h3>4. Phân biệt ba loại từ</h3>
   <table class="grammar-words"><thead><tr><th scope="col">Loại từ</th><th scope="col">Chức năng</th><th scope="col">Ví dụ</th></tr></thead><tbody>
   <tr><th scope="row">Noun</th><td>Gọi tên người, vật, sự vật</td><td lang="en">teacher, book, cat</td></tr>
   <tr><th scope="row">Verb</th><td>Diễn tả hành động, trạng thái</td><td lang="en">eat, sleep, work</td></tr>
   <tr><th scope="row">Adjective</th><td>Mô tả đặc điểm, trạng thái</td><td lang="en">happy, big, small</td></tr></tbody></table>
   <p class="example" lang="en">The student reads a book.</p><p>Học sinh đọc một quyển sách. <strong>Student</strong> và <strong>book</strong> là danh từ, <strong>reads</strong> là động từ.</p>
   <p class="example" lang="en">The student is happy.</p><p>Học sinh vui vẻ. <strong>Student</strong> là danh từ, <strong>is</strong> là động từ <i lang="en">to be</i>, <strong>happy</strong> là tính từ.</p>
  </div>
 </section>
 <section class="panel stack">
  <h2>Phần 2. Cấu trúc câu tiếng Anh</h2>
  <div><h3>5. Một câu tiếng Anh được tạo thành như thế nào?</h3><p class="example"><strong>S + V + O</strong> = Chủ ngữ + Động từ + Tân ngữ</p>
   <h4>5.1. Chủ ngữ (Subject · S)</h4><p>Chủ ngữ cho biết ai hoặc cái gì thực hiện hành động hoặc được nói đến.</p>
   <ul><li><span lang="en"><strong>I</strong> eat rice.</span> — Tôi ăn cơm.</li><li><span lang="en"><strong>She</strong> reads books.</span> — Cô ấy đọc sách.</li><li><span lang="en"><strong>The cat</strong> sleeps.</span> — Con mèo ngủ.</li></ul>
   <h4>5.2. Động từ (Verb · V)</h4><p>Động từ cho biết chủ ngữ làm gì hoặc ở trạng thái nào.</p>
   <ul><li lang="en">I <strong>eat</strong> rice.</li><li lang="en">She <strong>reads</strong> books.</li><li lang="en">The cat <strong>sleeps</strong>.</li></ul>
   <h4>5.3. Tân ngữ (Object · O)</h4>
   <p><strong>Tân ngữ cho biết hành động hướng đến ai hoặc cái gì.</strong> Trong câu <span lang="en">I eat rice.</span> (Tôi ăn cơm), <strong>I</strong> là người ăn, còn <strong>rice</strong> là thứ được ăn. Vì vậy, <strong>rice</strong> là tân ngữ.</p>
   <p><strong>Cách tìm tân ngữ trực tiếp.</strong> Tìm động từ trước, rồi hỏi “<strong>động từ + ai?</strong>” hoặc “<strong>động từ + cái gì?</strong>” Ví dụ, <span lang="en">They play <strong>football</strong>.</span> nghĩa là “Họ chơi bóng đá”. Hỏi “Họ chơi gì?” → “bóng đá”. Vậy <strong>football</strong> là tân ngữ.</p>
   <p><strong>Danh từ và đại từ là từ loại. Tân ngữ là vai trò của một từ hoặc một cụm từ trong câu.</strong> Ở bài này, hãy nhớ ba dạng thường gặp:</p>
   <ul>
    <li><strong>Danh từ.</strong> <span lang="en">She reads <strong>books</strong>.</span> — Cô ấy đọc sách. Cô ấy đọc gì? → <strong>books</strong> (sách).</li>
    <li><strong>Cụm danh từ</strong> (một nhóm từ có danh từ làm chính). <span lang="en">She reads <strong>a new book</strong>.</span> — Cô ấy đọc một quyển sách mới. Tân ngữ là cả cụm <strong>a new book</strong>. Trong cụm này, <strong>book</strong> là danh từ chính và <strong>new</strong> mô tả quyển sách.</li>
    <li><strong>Đại từ tân ngữ</strong> (từ dùng để thay cho người hoặc vật đã nhắc tới). <span lang="en">I see <strong>Mai</strong>. I see <strong>her</strong>.</span> — Tôi nhìn thấy Mai. Tôi nhìn thấy cô ấy. <strong>Her</strong> thay cho <strong>Mai</strong>. Các dạng thường gặp là <span lang="en">me, you, him, her, it, us, them</span>.</li>
   </ul>
   <p><strong>Cùng một danh từ có thể giữ vai trò khác nhau.</strong> Trong <span lang="en"><strong>Mai</strong> reads a book.</span> (Mai đọc sách), <strong>Mai</strong> là chủ ngữ. Trong <span lang="en">I see <strong>Mai</strong>.</span> (Tôi nhìn thấy Mai), <strong>Mai</strong> là tân ngữ.</p>
   <p><strong>Thử tự tìm.</strong> Trong <span lang="en">I have a small cat.</span> (Tôi có một con mèo nhỏ), hãy hỏi “Tôi có gì?”</p>
   <details><summary>Xem đáp án</summary><p>Tân ngữ là <strong lang="en">a small cat</strong> (một con mèo nhỏ). Đây là một cụm danh từ, với <strong lang="en">cat</strong> là danh từ chính.</p></details>
  </div>
  <div><h3>6. Phân tích một câu hoàn chỉnh</h3><p class="example" lang="en">I drink water.</p>
   <table class="grammar-words"><thead><tr><th scope="col">Chủ ngữ (S)</th><th scope="col">Động từ (V)</th><th scope="col">Tân ngữ (O)</th></tr></thead><tbody><tr><td lang="en"><strong>I</strong></td><td lang="en"><strong>drink</strong></td><td lang="en"><strong>water</strong></td></tr><tr><td>Tôi</td><td>uống</td><td>nước</td></tr></tbody></table>
  </div>
  <div><h3>7. Có phải câu nào cũng cần tân ngữ?</h3><p>Một số câu chỉ cần <strong>S + V</strong>.</p>
   <ul><li><span lang="en">I sleep.</span> — Tôi ngủ.</li><li><span lang="en">The baby cries.</span> — Em bé khóc.</li><li><span lang="en">Birds fly.</span> — Chim bay.</li></ul>
   <p>Một cấu trúc khác là <strong>S + to be + Adjective</strong>.</p>
   <ul><li><span lang="en">I am happy.</span> — Tôi vui vẻ.</li><li><span lang="en">She is tired.</span> — Cô ấy mệt.</li><li><span lang="en">The house is big.</span> — Ngôi nhà lớn.</li></ul>
   <p><em lang="en">Happy</em>, <em lang="en">tired</em> và <em lang="en">big</em> mô tả chủ ngữ. Chúng là tính từ và đóng vai trò bổ ngữ trong các câu này.</p>
  </div>
  <div><h3>8. Những lỗi thường gặp</h3>
   <ul><li><del lang="en">Eat I rice.</del> → <strong lang="en">I eat rice.</strong> Trong câu khẳng định thông thường, chủ ngữ đứng trước động từ.</li>
   <li><del lang="en">She happy.</del> → <strong lang="en">She is happy.</strong> Dùng <i lang="en">to be</i> giữa chủ ngữ và tính từ trong mẫu câu này.</li>
   <li><del lang="en">A house big</del> → <strong lang="en">A big house</strong>. Trong cụm danh từ này, <i lang="en">big</i> đứng trước <i lang="en">house</i>.</li></ul>
  </div>
 </section>`;
}

function grammar01Page(progress) {
 const results = feedbacks.get('grammar-01');
 let index = 0;
 const groups = grammar01Groups.map(([title, questions], group) => `
  <h3>Dạng ${group+1} — ${title}</h3>
  ${questions.map(([prompt, , , choices = grammar01Kinds]) => {
   const i = index++;
   const result = results?.[i];
   return `<fieldset class="exercise"><legend>Câu ${i+1}. ${esc(prompt)}</legend>
    ${choices.map((choice, option) => `<label class="choice"><input type="radio" name="q${i}" value="${option}" ${result?.value===String(option)?'checked':''}> ${'ABC'[option]}. ${esc(choice)}</label>`).join('')}
    <div class="feedback ${result?.ok?'ok':''}" data-grammar-feedback="${i}">${esc(result?.message)}</div></fieldset>`;
  }).join('')}`).join('');
 return grammar01Theory() + `<section class="panel stack">
  <h2>Phần 3. Bài tập thực hành</h2><p>20 câu · 4 dạng bài tập. Chọn một đáp án đúng cho mỗi câu.</p>
  <form class="stack" data-form="grammar-01">
   <p role="status" data-grammar-count>${results?.filter(result=>result.value!=='').length??0}/20 câu đã trả lời</p>
   ${groups}
   <div class="actions"><button class="button primary" type="submit">Chấm điểm</button>
   ${button('Xem đáp án','grammar-01-answers')}${button('Làm lại','grammar-01-reset')}</div>
   <p role="status" tabindex="-1" data-grammar-score>${results?grammar01ScoreText(results.filter(result=>result.ok).length):''}</p>
  </form>
 </section>
 <section class="panel stack">
  <h2>Phần 4. Luyện tập viết câu</h2><p>Dùng kiến thức vừa học để tự viết năm câu tiếng Anh.</p>
  <form class="stack" data-form="grammar-01-writing">
   ${grammar01Prompts.map(([prompt,hint], i)=>`<label class="field">${i+1}. ${esc(prompt)}<span class="muted">Gợi ý. ${esc(hint)}</span><input type="text" name="sentence${i}" lang="en" required maxlength="180" value="${esc(progress.grammar01Sentences?.[i])}" placeholder="Viết bằng tiếng Anh…"></label>`).join('')}
   <textarea name="draft" hidden></textarea>
   <div class="actions"><button class="button primary" type="submit">Chấm bài</button>${button('Sao chép bài viết','grammar-01-copy')}</div>
   <div class="writing-feedback" role="status"></div>
  </form>
  <details><summary>Xem câu mẫu</summary><ol lang="en">${grammar01Prompts.map(([, , example])=>'<li>'+esc(example)+'</li>').join('')}</ol><p>Câu mẫu dùng để tự đối chiếu. Bạn có thể viết câu khác mà vẫn đúng ngữ pháp.</p></details>
 </section>
 <section class="panel stack">
  <h2>Phần 5. Tổng kết bài học</h2>
  <ul><li><strong>Danh từ (Noun)</strong> gọi tên người, vật, địa điểm hoặc sự vật. Ví dụ <i lang="en">teacher, book, school</i>.</li>
  <li><strong>Động từ (Verb)</strong> diễn tả hành động hoặc trạng thái. Ví dụ <i lang="en">eat, sleep, is</i>.</li>
  <li><strong>Tính từ (Adjective)</strong> mô tả đặc điểm hoặc trạng thái. Ví dụ <i lang="en">happy, big, small</i>.</li>
  <li><strong>S + V + O</strong> là một cấu trúc câu thông dụng. Ví dụ <i lang="en">I drink water.</i></li>
  <li><strong>S + V</strong> cũng có thể tạo thành câu hoàn chỉnh. Ví dụ <i lang="en">I sleep.</i></li></ul>
  <div><h3>Điều kiện hoàn thành phần Ngữ pháp</h3><p>Đạt ít nhất 16/20 câu trắc nghiệm (80%) và hoàn thành 5 câu tự viết.</p>
  <p role="status" data-grammar-completion>${grammar01CompletionText(progress)}</p></div>
  <p class="muted">Bài ngữ pháp tiếp theo · Đại từ nhân xưng — I, You, He, She, It, We, They.</p>
 </section>`;
}

function grammar01ScoreText(score) {
 return score+'/20 câu đúng · '+score*5+'% · '+(score>=grammar01PassingScore?'Đạt yêu cầu.':'Cần ít nhất 16 câu đúng.');
}
function grammar01CompletionText(progress) {
 const passed = (progress.grammar01Best??0)>=grammar01PassingScore;
 const written = grammar01Prompts.every((_,i)=>progress.grammar01Sentences?.[i]?.trim());
 return passed&&written?'Đã hoàn thành phần Ngữ pháp.':(passed?'Đã đạt trắc nghiệm.':'Chưa đạt trắc nghiệm.')+' '+(written?'Đã lưu 5 câu tự viết.':'Chưa lưu đủ 5 câu tự viết.');
}
function grammar01RefreshCompletion() {
 const status = document.querySelector('[data-grammar-completion]');
 if(status) status.textContent = grammar01CompletionText(state.progress[0]||{});
}
function grammar01Results(form) {
 const data = new FormData(form);
 return grammar01Questions.map(([, correct, why, choices = grammar01Kinds], i) => {
  const value = String(data.get('q'+i)??'');
  const ok = value === String(correct);
  return {value,ok,message:(ok?'Đúng! ':'Đáp án '+ 'ABC'[correct]+' · '+choices[correct]+' — ')+why};
 });
}
function grammar01ShowAnswers(form, results) {
 results.forEach((result, i) => {
  const feedback = form.querySelector('[data-grammar-feedback="'+i+'"]');
  feedback.textContent = result.message;
  feedback.classList.toggle('ok',result.ok);
 });
}
async function grammar01GradeQuiz(form) {
 const results = grammar01Results(form);
 const status = form.querySelector('[data-grammar-score]');
 if(results.some(result=>result.value==='')){
  status.textContent = 'Hãy trả lời đủ 20 câu trước khi chấm điểm.';
  form.querySelector('input[name="q'+results.findIndex(result=>result.value==='')+'"]').focus();
  return;
 }
 feedbacks.set('grammar-01',results);
 grammar01ShowAnswers(form,results);
 const score = results.filter(result=>result.ok).length;
 status.textContent = grammar01ScoreText(score);
 status.focus();
 if(score>(state.progress[0]?.grammar01Best??0)){
  await update(profile=>{
   const progress = profile.progress[0] ||= {tab:1};
   progress.grammar01Best = Math.max(progress.grammar01Best??0,score);
  });
 }
 grammar01RefreshCompletion();
}
function grammar01Sentences(form) {
 return grammar01Prompts.map((_, i) => form.elements['sentence'+i].value.trim());
}
async function grammar01GradeWriting(form) {
 const sentences = grammar01Sentences(form);
 if(sentences.some(sentence=>!sentence)){toast('Viết đủ 5 câu rồi bấm Chấm bài.');return}
 const draft = sentences.join('\n');
 form.elements.draft.value = draft;
 await update(profile=>{
  const progress = profile.progress[0] ||= {tab:1};
  progress.grammar01Sentences = sentences;
 });
 grammar01RefreshCompletion();
 const task = 'Chấm 5 câu tiếng Anh A0 theo thứ tự. Câu 1 dùng eat. Câu 2 dùng drink. Câu 3 dùng happy. Câu 4 dùng small. Câu 5 có chủ ngữ + động từ + tân ngữ. Chấp nhận mọi cách viết đúng.';
 await gradeWriting(form,draft,task);
}
async function grammar01Action(action, form) {
 if(action==='grammar-01-copy'){
  const text = grammar01Sentences(form).filter(Boolean).join('\n');
  if(!text){toast('Nhập câu trước khi sao chép.');return}
  try{await navigator.clipboard.writeText(text);toast('Đã sao chép bài viết.')}
  catch{toast('Trình duyệt chưa cho phép sao chép.')}
 }
 if(action==='grammar-01-answers'){
  grammar01ShowAnswers(form,grammar01Results(form));
  form.querySelector('[data-grammar-score]').textContent = 'Đã mở đáp án và giải thích dưới mỗi câu.';
  form.querySelector('input[type="radio"]').focus();
 }
 if(action==='grammar-01-reset'){
  feedbacks.delete('grammar-01');
  form.querySelectorAll('input').forEach(input=>{input.checked=false});
  form.querySelectorAll('[data-grammar-feedback]').forEach(node=>{node.textContent='';node.classList.remove('ok')});
  form.querySelector('[data-grammar-score]').textContent='';
  grammar01UpdateCount(form);
  form.querySelector('input[type="radio"]').focus();
 }
}
function grammar01UpdateCount(form) {
 form.querySelector('[data-grammar-count]').textContent = form.querySelectorAll('input:checked').length+'/20 câu đã trả lời';
}
