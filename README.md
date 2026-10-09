# BioLab Interactive - Sách Giáo Khoa Sinh Học Tương Tác 2D

Nền tảng học tập Sinh học kỹ thuật số trực quan dành cho học sinh THPT (Sinh 10, Sinh 11, Sinh 12), được thiết kế theo phong cách sách giáo khoa điện tử tương tác 2D.

---

## 🚀 Tính Năng Nổi Bật

1. **Khám Phá Sơ Đồ 2D Tương Tác**:
   - Tế bào nhân thực (Eukaryotic Cell): Nhân, Ti thể, Ribosome, Lục thể, Màng sinh chất, Bộ máy Golgi.
   - Cấu trúc xoắn đôi ADN (Watson-Crick Double Helix).
   - Tiến trình các kỳ Nguyên phân (Mitosis Timeline).
   - Bài tập ghép nối khái niệm và chức năng sinh học.

2. **Bài Tập Củng Cố & Thử Thách**:
   - Trắc nghiệm tương tác phản hồi kết quả tức thì kèm giải thích chi tiết.
   - Thử thách lật mở đáp án (Reveal answer).
   - Hiệu ứng ăn mừng (Confetti) khi đạt điểm cao.

3. **Đối Chiếu Trang Sách Gốc PDF**:
   - Tích hợp cửa sổ xem file PDF gốc (`sinh-10.pdf`, `sinh-11.pdf`, `sinh-12.pdf`) theo đúng trang giáo khoa để học sinh xác thực kiến thức chuẩn.

4. **Hệ Thống Tiến Độ & Gamification**:
   - Theo dõi chuỗi ngày học liên tục (Streak).
   - Tích lũy điểm kinh nghiệm XP.
   - Bảng tổng kết danh hiệu & huy chương học tập (Nhà Tế Bào Học, Chuyên Gia Di Truyền...).
   - Tự động lưu tiến độ vào `LocalStorage`.

---

## 💻 Hướng Dẫn Chạy Trên Localhost

1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

2. **Khởi chạy máy chủ Dev**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập địa chỉ localhost: `http://localhost:5173` (hoặc cổng hiển thị trong Terminal).

3. **Đóng gói kiểm tra bản Build**:
   ```bash
   npm run build
   ```

---

## 🌐 Hướng Dẫn Deploy Lên GitHub Pages

### Cách 1: Sử dụng GitHub Actions (Khuyên dùng - Tự động)
1. Push toàn bộ mã nguồn lên repository GitHub của bạn:
   ```bash
   git add .
   git commit -m "Deploy BioLab Interactive Textbook"
   git push origin main
   ```
2. Trên kho lưu trữ GitHub, truy cập **Settings** ➔ **Pages**.
3. Tại mục **Build and deployment** ➔ **Source**, chọn **GitHub Actions**.
4. GitHub sẽ tự động build và publish trang web lên tên miền: `https://<your-username>.github.io/<repository-name>/`.

---

## 📂 Cấu Trúc Mã Nguồn

```text
src/
├── components/
│   ├── biology/            # Sơ đồ tương tác 2D, Trắc nghiệm, Timeline, Flashcard, PDF Modal
│   ├── gamification/       # Bảng huy chương & thành tích
│   └── layout/             # Navbar, Footer
├── data/
│   ├── booksData.ts        # Dữ liệu nội dung các bài học Sinh 10, 11, 12
│   └── interactiveData.ts  # Bản đồ Hotspot sơ đồ 2D, ngân hàng trắc nghiệm & timeline
├── pages/                  # HomePage, BooksPage, LessonPage, ExplorePage, SearchPage, ProgressPage
├── types/                  # Định nghĩa TypeScript interfaces
├── App.tsx                 # Điều hướng ứng dụng
└── index.css               # Hệ thống giao diện Glassmorphism & animation
```
