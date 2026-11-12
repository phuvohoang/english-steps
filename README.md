# English Steps

Website tiếng Anh A0–A1. Sổ từ và tiến độ dùng IndexedDB theo địa chỉ trang. Hãy xuất JSON từ website cũ rồi nhập ở địa chỉ mới nếu muốn mang dữ liệu sang.

## Chạy và triển khai
- Chạy `python3 -m http.server 8000 --directory docs` rồi mở http://localhost:8000/.
- GitHub Pages: Settings → Pages → Deploy from a branch → main → /docs.

## Soạn bài và duyệt audio
1. Dùng AI soạn nội dung gồm mục tiêu, từ vựng (từ, nghĩa, ví dụ), ngữ pháp, hội thoại, bài nói và viết, câu hỏi và đáp án. Duyệt nội dung rồi cập nhật `docs/lessons.js`.
2. Bản thử nghiệm Kokoro có job cho bài Giới thiệu bản thân. Chạy **Actions → Render lesson audio → Run workflow** rồi tải artifact `introduce-yourself-audio`. Job tách các lượt hội thoại, gửi lời thoại cho hai giọng và chèn khoảng nghỉ 320 ms. Từ `live` trong bài được chỉ định /lɪv/.
3. Nghe duyệt từng MP3. Chép các file đã duyệt vào `docs/audio/` với tên tương ứng. Giữ bản kết quả và manifest trong `docs/audio-review/` nếu muốn chạy tiếp từ bản trước. Script chỉ tạo lại các file thiếu hoặc có đầu vào thay đổi. Workflow chỉ xuất artifact để duyệt.
4. Khi dùng bản thu người thật, chỉ chọn clip khớp giọng và cách đọc, kiểm tra giấy phép của từng clip và lưu nguồn, tác giả, giấy phép cùng bài. Bản này chưa nhập kho Wikimedia. Bộ audio đang phát là bộ của bản English Steps đã triển khai trước đó.

## Tra từ
Hộp Thêm từ tra hai chiều trong dữ liệu bài học, hỗ trợ tìm không dấu. Chọn một kết quả để điền nghĩa, ví dụ và gắn clip vào thẻ. Bài nghe–gõ chỉ đưa vào những thẻ có clip. Từ ngoài kho có thể nhập thủ công và dùng trong các chế độ ôn còn lại. Bản này chưa có dịch vụ tạo audio theo yêu cầu.
