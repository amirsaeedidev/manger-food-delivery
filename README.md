# manger-food-delivery — سیستم مدیریت رستوران

> Restaurant management system — Node.js / Express / MongoDB backend + React / Tailwind CSS frontend.

سیستم مدیریت رستوران برای ثبت و پیگیری سفارش‌ها، مدیریت میزها و رزروها، منو، مشتریان و باشگاه مشتریان، انبار، تخفیف‌ها، پرداخت، پیامک، گزارش‌ها و داشبورد مدیریتی؛ همراه با به‌روزرسانی لحظه‌ای (Socket.io) برای آشپزخانه و میزها.

> 🚧 **وضعیت پروژه: اسکلت اولیه.** ساختار کامل پوشه‌ها و فایل‌ها ساخته شده و هم سرور و هم رابط کاربری اجرا می‌شوند، اما منطق ماژول‌ها (فیلدهای مدل‌ها، controllerها، صفحه‌ها و کامپوننت‌ها و …) هنوز پیاده‌سازی نشده و فایل‌های مربوط به آن‌ها placeholder هستند. وضعیت هر بخش در [docs/FEATURES.md](docs/FEATURES.md) نوشته شده است.

## فناوری‌ها

| بخش | ابزار |
| --- | --- |
| Backend | Node.js، Express 5، MongoDB با Mongoose 9، Socket.io، Helmet، CORS، Morgan |
| Frontend | React 18، React Router 6، Zustand، Axios، Socket.io-client، Tailwind CSS 3 (ساخته‌شده با Create React App) |
| سرویس‌های بیرونی (برنامه‌ریزی‌شده) | پیامک (Kavenegar یا Smsir)، درگاه پرداخت ZarinPal، ایمیل (SMTP) |
| استقرار | Docker و Docker Compose (MongoDB + Backend + Frontend/nginx) |

## ساختار پروژه

```text
.
├── backend/              # API با Express + Socket.io
│   ├── src/
│   │   ├── config/       # اتصال MongoDB، متغیرهای محیطی، ثابت‌ها
│   │   ├── models/       # Mongoose Schemas
│   │   ├── routes/       # مسیرهای API (index.js همه را ترکیب می‌کند)
│   │   ├── controllers/  # لاجیک کسب‌وکار
│   │   ├── services/     # SMS، پرداخت، ایمیل، چاپ فیش، گزارش
│   │   ├── middleware/   # auth، validation، خطایاب، logger، cors
│   │   ├── utils/        # توابع کمکی، JWT، ثابت‌ها
│   │   ├── socket/       # رویدادهای Socket.io
│   │   └── app.js        # برنامه‌ی Express
│   └── server.js         # نقطه‌ی شروع سرور
├── frontend/             # رابط کاربری React
│   ├── public/           # index.html، favicon، logo
│   └── src/
│       ├── components/   # کامپوننت‌ها به تفکیک ماژول
│       ├── pages/        # صفحه‌های اصلی
│       ├── hooks/        # Custom Hooks
│       ├── services/     # فراخوانی API (Axios)
│       ├── store/        # state سراسری (Zustand)
│       ├── styles/       # Tailwind و استایل‌های سراسری
│       ├── constants/    # ثابت‌ها
│       ├── utils/        # توابع کمکی، Socket، چاپ
│       ├── App.jsx       # مسیرها (Routes)
│       ├── index.jsx     # نقطه‌ی ورود
│       └── setupProxy.js # proxy سرور توسعه به بک‌اند (فقط npm start)
├── docs/                 # مستندات
├── docker/               # Dockerfileها و docker-compose.yml
├── CONTRIBUTING.md
└── README.md
```

توضیح کامل هر بخش در [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) آمده است.

## شروع سریع

### پیش‌نیازها

- Node.js **۲۰.۱۹ یا بالاتر** (نسخه‌ای که پروژه با آن آزموده شده: ۲۲ LTS) و npm
- MongoDB (نصب محلی، یا با Docker: `docker run -d -p 27017:27017 --name mongo mongo:8`)

### اجرا بدون Docker

```bash
# ۱) بک‌اند — http://localhost:5000/api/health
cd backend
cp .env.example .env      # سپس JWT_SECRET و بقیه‌ی مقادیر را تنظیم کنید
npm install
npm run dev

# ۲) فرانت‌اند (در ترمینال دیگر) — http://localhost:3000
cd frontend
cp .env.example .env
npm install
npm start
```

فرانت‌اند درخواست‌های `/api` و `/socket.io` را در حالت توسعه (با `src/setupProxy.js`) به بک‌اند (پورت ۵۰۰۰) proxy می‌کند؛ پس نیازی به تنظیم CORS یا آدرس API نیست.

### اجرا با Docker

```bash
cp backend/.env.example backend/.env   # و JWT_SECRET را با یک مقدار تصادفی بلند عوض کنید
docker compose -f docker/docker-compose.yml up --build
```

فرانت‌اند روی <http://localhost:3000> و API روی <http://localhost:5000/api/health> در دسترس است.

جزئیات بیشتر (متغیرهای محیطی، عیب‌یابی) در [docs/SETUP.md](docs/SETUP.md).

## مستندات

| فایل | محتوا |
| --- | --- |
| [docs/SETUP.md](docs/SETUP.md) | نصب، تنظیمات محیطی، اجرا، Docker و عیب‌یابی |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | معماری، لایه‌ها، جریان داده و تصمیم‌های فنی |
| [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) | قراردادهای API و فهرست مسیرها |
| [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | مدل‌ها (collectionها) و ارتباط آن‌ها |
| [docs/FEATURES.md](docs/FEATURES.md) | قابلیت‌ها و وضعیت پیاده‌سازی |
| [backend/README.md](backend/README.md) | راهنمای بک‌اند |
| [frontend/README.md](frontend/README.md) | راهنمای فرانت‌اند |

## مشارکت در پروژه

قبل از شروع، [CONTRIBUTING.md](CONTRIBUTING.md) را بخوانید.
