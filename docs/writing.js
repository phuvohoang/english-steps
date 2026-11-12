const writingEndpoint = document.querySelector('meta[name="writing-endpoint"]')?.content.trim();
const writingLabels = {grammar:'Ngữ pháp', vocabulary:'Từ vựng', spelling:'Chính tả / dấu câu', style:'Gợi ý diễn đạt'};
const writingTaskLabels = {met:'Đúng yêu cầu đề', partial:'Đạt một phần yêu cầu đề', missing:'Chưa đúng yêu cầu đề'};

function writingDiff(draft, report, demo = false) {
 let original = '', corrected = '', cursor = 0;
 for (const edit of report.edits) {
  const unchanged = esc(draft.slice(cursor, edit.start));
  original += unchanged + '<del>'+esc(edit.before)+'</del>';
  corrected += unchanged + (edit.after ? '<ins>'+esc(edit.after)+'</ins>' : '');
  cursor = edit.start + edit.before.length;
 }
 original += esc(draft.slice(cursor));
 corrected += esc(draft.slice(cursor));
 return '<section class="writing-report" aria-label="Kết quả chấm bài"><h3>'+(demo?'Kết quả minh họa':'Kết quả chấm bài')+'</h3>'+
  (demo?'<p class="muted">Ví dụ có sẵn để thử giao diện.</p>':'')+
  '<p><strong>'+writingTaskLabels[report.task]+'</strong> · '+esc(report.feedback)+'</p>'+
  '<div class="writing-diff"><div><h4>Bài của bạn</h4><p lang="en">'+original+'</p></div><div><h4>Bản sửa gợi ý</h4><p lang="en">'+corrected+'</p></div></div>'+
  (report.edits.length?'<ul class="writing-notes">'+report.edits.map(edit=>'<li><strong>'+writingLabels[edit.kind]+'</strong> <span lang="en">'+esc(edit.before)+(edit.after?' → '+esc(edit.after):' → bỏ')+'</span><p>'+esc(edit.why)+'</p></li>').join('')+'</ul>':'<p>AI không đề xuất thay đổi câu nào.</p>')+'</section>';
}

function showWritingExample(form) {
 const draft = 'Hello, Mai. How is you? I am very fine.';
 const edits = [
  {start:draft.indexOf('is'), before:'is', after:'are', kind:'grammar', why:'Dùng are với chủ ngữ you.'},
  {start:draft.indexOf('very fine'), before:'very fine', after:'fine', kind:'style', why:'Trong lời hỏi thăm, I am fine nghe tự nhiên hơn.'},
 ];
 form.querySelector('.writing-feedback').innerHTML = writingDiff(draft,{
  task:'met',feedback:'Bạn đã có lời chào và câu hỏi thăm.',edits,
 },true);
}

async function gradeWriting(form, draft, task) {
 const feedback = form.querySelector('.writing-feedback');
 if (!writingEndpoint) {
  feedback.textContent = 'Đã lưu bài viết. Chấm AI cần kết nối Cloudflare.';
  return;
 }
 const submit = form.querySelector('[type="submit"]');
 submit.disabled = true;
 feedback.textContent = 'Đang chấm bài…';
 try {
  const response = await fetch(writingEndpoint,{
   method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({draft,task}),
   signal:AbortSignal.timeout(25000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Không chấm được bài.');
  if (form.elements.draft.value.trim() !== draft) {
   feedback.textContent = 'Bạn đã sửa bản nháp. Bấm Chấm bài để xem kết quả mới.';
   return;
  }
  feedback.innerHTML = writingDiff(draft,result);
 } catch (error) {
  feedback.textContent = error.name === 'TimeoutError' ? 'AI phản hồi chậm. Hãy thử lại.' : 'Chưa chấm được bài. '+error.message;
 } finally {
  submit.disabled = false;
 }
}
