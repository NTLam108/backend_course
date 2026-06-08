# Vietnam Rent-a-Car - Hệ thống cho thuê xe du lịch 🚗💨

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-5.x-blue.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![ORM](https://img.shields.io/badge/ORM-Prisma-black.svg)](https://www.prisma.io/)
[![Database](https://img.shields.io/badge/Database-MySQL-blue.svg)](https://www.mysql.com/)

Chào mừng bạn đến với **Vietnam Rent-a-Car**, một giải pháp backend toàn diện cho dịch vụ cho thuê xe. Dự án được xây dựng với kiến trúc hiện đại, tập trung vào tính bảo mật, hiệu năng và khả năng mở rộng, tích hợp cả thanh toán trực tuyến và trí tuệ nhân tạo.

---

## 🌟 Tính năng chính (Key Features)

### 1. Quản lý Thuê xe (Car Rental Management)
- **Danh mục xe đa dạng:** Phân loại theo dòng xe (SUV, Sedan, Wedding Car...), thương hiệu, số ghế.
- **Quy trình đặt xe:** Kiểm tra tính khả dụng, chọn ngày nhận/trả xe và địa điểm.
- **Chi tiết đặt hàng:** Quản lý thông tin người thuê, số tiền, ngày giờ và trạng thái đơn hàng.

### 2. Hệ thống Phụ kiện & Công cụ (Accessories & Tools Shop)
- Cung cấp các công cụ đi kèm (GPS, ghế trẻ em, thiết bị bảo hộ...).
- Hệ thống giỏ hàng (Cart) linh hoạt, hỗ trợ lưu trữ session trong database qua Prisma.

### 3. Bảo mật & Phân quyền (Security & RBAC)
- **Xác thực:** Sử dụng `Passport.js` với chiến lược `Local Strategy`.
- **Mã hóa:** Bảo mật mật khẩu tuyệt đối với `Bcrypt`.
- **Phân quyền (RBAC):** Hệ thống phân vai trò (Role-based Access Control) cho người dùng và quản trị viên.

### 4. Thanh toán Trực tuyến (Payment Integration)
- Tích hợp cổng thanh toán **Stripe**, hỗ trợ thanh toán an toàn và xử lý trạng thái giao dịch tự động.

### 5. Chatbot AI thông minh (AI Integration)
- Tích hợp **Groq SDK (Llama 3.3)** đóng vai trò trợ lý ảo, hỗ trợ người dùng tìm kiếm thông tin và tư vấn dịch vụ ngay trên website.

### 6. Quản lý Dữ liệu (ORM & Database)
- Sử dụng **Prisma ORM** để quản lý Schema MySQL một cách chặt chẽ.
- Hỗ trợ Seeding dữ liệu mẫu tự động khi khởi tạo dự án.

---

## 🛠 Công nghệ sử dụng (Tech Stack)

| Lớp (Layer) | Công nghệ |
| :--- | :--- |
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js (v5.x) |
| **Language** | TypeScript |
| **Database** | MySQL |
| **ORM** | Prisma |
| **Auth** | Passport.js, Express-Session, Bcrypt |
| **AI** | Groq SDK (Llama 3.3) |
| **Payment** | Stripe API |
| **Validation** | Zod |
| **View Engine** | EJS |

---

## 🚀 Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống
- Node.js installed.
- MySQL Server đang chạy.

### 2. Clone dự án và cài đặt dependencies
```bash
git clone https://github.com/NTLam108/backend_course.git
cd backend_course
npm install
```

### 3. Cấu hình biến môi trường (`.env`)
Tạo file `.env` tại thư mục gốc và cấu hình các thông số sau:
```env
PORT=8080
DATABASE_URL="mysql://username:password@localhost:3306/your_db_name"
GROQ_API_KEY="your_groq_api_key"
STRIPE_SECRET_KEY="your_stripe_key"
```

### 4. Khởi tạo Database
Sử dụng Prisma để đẩy schema vào database và sinh client:
```bash
npx prisma generate
npx prisma db push
```

---

## 📖 Scripts chính

- **Chạy chế độ Development (Auto reload):**
  ```bash
  npm run dev
  ```
- **Build dự án (Convert TS to JS):**
  ```bash
  npm run build
  ```
- **Chạy Production:**
  ```bash
  npm start
  ```

---

## 📂 Cấu trúc thư mục (Project Structure)

```text
src/
├── config/         # Cấu hình database, seed dữ liệu
├── controllers/    # Xử lý logic nghiệp vụ cho Client/Admin
├── middleware/     # Passport, check auth, validate...
├── routes/         # Định nghĩa các endpoint (Web/API)
├── services/       # Tầng giao tiếp với database qua Prisma
├── views/          # Giao diện EJS template
├── app.ts          # Điểm khởi đầu của ứng dụng (Entry point)
prisma/
└── schema.prisma   # Định nghĩa Data Model
public/             # Static assets (CSS, JS, Images)
```

---

## 🤝 Liên hệ
- **Tác giả:** Nguyễn Trọng Lâm
- **Facebook:** [Nguyen Trong Lam](https://www.facebook.com/lam.nguyentrong.904)
- **Github:** [@NTLam108](https://github.com/NTLam108)

---
*Dự án được xây dựng với mục đích học tập và phát triển kỹ năng Backend chuyên sâu.*