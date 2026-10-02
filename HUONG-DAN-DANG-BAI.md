# Hướng dẫn đăng bài lên blog tkschut

Blog chạy bằng GitHub Pages. Mỗi bài viết là một file chữ nằm trong thư mục `_posts`. Bạn thêm file, bấm Commit, khoảng 1–2 phút sau bài sẽ tự hiện trên blog.

Địa chỉ blog: **https://tkschutblog.com**

---

## Bật blog lần đầu (chỉ làm một lần)

1. Vào repo `mira1611/tkschutblog` trên github.com.
2. Bấm **Settings** → mục **Pages** ở cột bên trái.
3. Ở phần **Build and deployment**, mục Source chọn **Deploy from a branch**. Mục Branch chọn **main** và thư mục **/ (root)**, rồi bấm **Save**.
4. Đợi 1–2 phút, tải lại trang, GitHub sẽ hiện đường link blog của bạn.

---

## Đăng một bài mới

1. Vào repo trên github.com và mở thư mục **`_posts`**.
2. Bấm **Add file** → **Create new file**.
3. Đặt tên file theo mẫu **`năm-tháng-ngày-ten-bai.md`**, viết không dấu và nối các chữ bằng gạch ngang.
   Ví dụ: `2026-10-01-hoang-hon-o-da-lat.md`
   Phần tên sau ngày sẽ trở thành đường link của bài.
4. Dán phần thông tin đầu bài vào, rồi sửa lại cho đúng bài của bạn:

```
---
title: "Hoàng hôn ở Đà Lạt"
date: 2026-10-01 20:00:00 +0700
category: Chuyến đi
cover: "https://link-anh-bia.jpg"
excerpt: "Một câu ngắn giới thiệu bài, sẽ hiện trên trang chủ."
---
```

5. Để trống một dòng rồi viết nội dung bài bên dưới.
6. Kéo xuống cuối trang, bấm **Commit changes** → **Commit changes**.

Xong rồi đó. Khoảng 1–2 phút sau, bài sẽ hiện ở đầu trang chủ.

### Ý nghĩa từng dòng thông tin

| Dòng | Ý nghĩa |
|---|---|
| `title` | Tiêu đề bài. Giữ dấu ngoặc kép `" "` ở hai đầu. |
| `date` | Ngày giờ đăng, theo dạng `năm-tháng-ngày giờ:phút:giây +0700`. Bài mới nhất sẽ nằm trên cùng. |
| `category` | Chủ đề: **Sống chậm**, **Chuyến đi**, **Tình yêu** hoặc **Khác**. Viết đúng từng chữ để bộ lọc trên trang chủ hoạt động. |
| `cover` | Ảnh bìa (không bắt buộc). Có thể là link ảnh hoặc ảnh đã tải lên repo, ví dụ `/images/da-lat.jpg`. Nếu bỏ dòng này, blog sẽ dùng hình hoàng hôn mặc định. |
| `excerpt` | Câu giới thiệu ngắn (không bắt buộc). |

> **Lưu ý:** nếu `date` là một ngày trong tương lai, bài sẽ chưa hiện lên. Đó là cách để hẹn giờ đăng bài.

---

## Cách viết trong bài

- **Xuống đoạn mới:** để trống một dòng giữa hai đoạn.
- **Chữ nghiêng:** `*chữ nghiêng*`
- **Chữ đậm:** `**chữ đậm**`
- **Trích dẫn:** bắt đầu dòng bằng `> `
- **Tiêu đề nhỏ trong bài:** bắt đầu dòng bằng `## `
- **Chèn ảnh:** `![](link-ảnh)`

File `bai-mau.md` ở thư mục gốc là một bài mẫu đầy đủ để bạn chép theo.

---

## Tải ảnh lên

1. Mở thư mục **`images`** trong repo → **Add file** → **Upload files**.
2. Kéo ảnh vào, đặt tên không dấu (ví dụ `da-lat.jpg`), rồi bấm **Commit changes**.
3. Trong bài, dùng đường dẫn `/images/da-lat.jpg`.

Nên giảm kích thước ảnh xuống chiều rộng khoảng 1200px trước khi tải lên để blog chạy nhanh.

---

## Sửa hoặc xoá bài

- **Sửa bài:** mở file trong `_posts`, bấm biểu tượng cây bút ✏️, sửa xong thì bấm **Commit changes**.
- **Xoá bài:** mở file, bấm dấu **…** ở góc phải → **Delete file** → **Commit changes**.

---

## Đổi link mạng xã hội hoặc thêm chủ đề

Mở file **`_config.yml`**:

- Mục `social`: thay link Facebook, TikTok và Instagram bằng trang cá nhân của bạn.
- Mục `topics`: thêm hoặc đổi tên chủ đề. Nhớ dùng đúng tên đó ở dòng `category` của bài.

---

## Nếu bài không hiện lên

- Vào tab **Actions** của repo. Nếu thấy dấu ❌ đỏ, bấm vào để xem lỗi.
- Lỗi thường gặp nhất là thiếu một trong hai dòng `---` ở đầu và cuối phần thông tin, hoặc thiếu dấu ngoặc kép trong `title`.
- Nếu tiêu đề có dấu ngoặc kép bên trong, hãy viết `\"`. Ví dụ: `title: "\"Vừa đủ\""`.

---

## Thu email đăng ký "Thư chiều Chủ nhật" vào Google Sheet

1. Vào sheets.google.com và tạo một bảng tính mới, đặt tên tuỳ ý (ví dụ "Đăng ký blog").
2. Trên thanh menu, bấm **Tiện ích mở rộng → Apps Script** (tiếng Anh: Extensions → Apps Script).
3. Xoá hết đoạn code có sẵn, dán toàn bộ nội dung file `google-sheet/dang-ky-email.gs` vào, rồi bấm biểu tượng 💾 để lưu.
4. Bấm **Triển khai → Tùy chọn triển khai mới** (Deploy → New deployment). Ở biểu tượng bánh răng, chọn **Ứng dụng web** (Web app).
   - Thực thi dưới dạng (Execute as): **Tôi** (Me)
   - Người có quyền truy cập (Who has access): **Bất kỳ ai** (Anyone)
5. Bấm **Triển khai** (Deploy) → **Cấp quyền truy cập** → chọn tài khoản Google của bạn. Nếu Google báo "ứng dụng chưa được xác minh", bấm **Nâng cao → Đi tới … (không an toàn)** → **Cho phép**. Đây là code của chính bạn nên an toàn.
6. Chép **URL ứng dụng web** (có đuôi `/exec`).
7. Mở file `_config.yml` trong repo, dán URL đó vào dòng `newsletter_sheet_url: ""`, giữa hai dấu ngoặc kép, rồi bấm Commit.

Từ đó, mỗi người đăng ký sẽ thêm một dòng vào trang tính **Đăng ký**, gồm thời gian, email và trang họ đăng ký. Email trùng sẽ không bị ghi hai lần.
