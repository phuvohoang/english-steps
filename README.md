# English Steps

Website tiếng Anh A0–A1. Sổ từ và tiến độ dùng IndexedDB theo địa chỉ trang. Hãy xuất JSON từ website cũ rồi nhập ở địa chỉ mới nếu muốn mang dữ liệu sang.

## Chạy và triển khai
- Chạy `python3 -m http.server 8000 --directory docs` rồi mở http://localhost:8000/.
- GitHub Pages: Settings → Pages → Deploy from a branch → main → /docs.

## Soạn bài và duyệt audio
1. Dùng AI soạn nội dung gồm mục tiêu, từ vựng (từ, nghĩa, ví dụ), ngữ pháp, hội thoại, bài nói và viết, câu hỏi và đáp án. Duyệt nội dung rồi cập nhật `docs/lessons.js`.
2. Chạy **Actions → Render lesson audio → Run workflow** rồi tải artifact `english-steps-audio`. Job dùng hai giọng Mỹ cho hội thoại, gửi riêng lời thoại của từng vai và chèn khoảng nghỉ 320 ms.
3. Nghe duyệt các clip mới rồi chép MP3 và manifest tương ứng vào `docs/audio/`. Lần chạy sau chỉ tạo lại clip thiếu hoặc có đầu vào thay đổi. Workflow kiểm tra giải mã từng MP3. Nhánh phát hành audio có thể lưu kết quả để duyệt trước khi đưa vào `main`.
4. Nếu bổ sung bản thu người thật, kiểm tra cách đọc, giọng và giấy phép từng clip rồi lưu nguồn và tác giả cùng bài.

## Tra từ
Hộp Thêm từ tra hai chiều trong dữ liệu bài học, hỗ trợ tìm không dấu. Chọn một kết quả để điền nghĩa, ví dụ và gắn clip vào thẻ. Bài nghe–gõ chỉ đưa vào những thẻ có clip. Từ ngoài kho có thể nhập thủ công và dùng trong các chế độ ôn còn lại. Bản này chưa có dịch vụ tạo audio theo yêu cầu.
