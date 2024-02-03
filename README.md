## Khởi chạy dự án

- Đầu tiên chạy câu lệnh sau để cài đặt các gói phụ thuộc:
```bash
npm i
```

- Sau đó chạy câu lệnh sau để khởi chạy dự án:
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) với trình duyệt của bạn để xem kết quả.

## Cài đặt biến môi trường

Khởi tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường sau:

```javascript

# Vercel secrets for production
AUTH_SECRET=

# For email
PASSWORD_RESET_URL=http://localhost:3000/auth/reset-password
SIGN_IN_URL=http://localhost:3000/auth/signin
VERIFICATION_URL=http://localhost:3000/verify

PAYMENT_SUCCESS_URL=http://localhost:3000/profile/orders
PAYMENT_CANCEL_URL=http://localhost:3000/profile/orders

# For cloudinary
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

# For payment gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```

- Đối với AUTH_SECRET, bạn có thể tạo bằng cách truy cập trang [https://generate-secret.vercel.app/](https://generate-secret.vercel.app/)
-  Đối với CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, bạn có thể tạo tài khoản tại [https://cloudinary.com/](https://cloudinary.com/), sau đó tạo một cloud name và lấy api key và api secret. 
-  Đối với STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, bạn có thể tạo tài khoản tại [https://stripe.com/](https://stripe.com/), sau đó tạo một tài khoản và lấy api key và webhook secret.

