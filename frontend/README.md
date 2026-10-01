# فرانت‌اند — رابط کاربری سیستم مدیریت رستوران

React 18 + React Router 6 + Zustand + Tailwind CSS 3 (ساخته‌شده با Create React App)

> 🚧 **اسکلت:** پوسته‌ی برنامه (Layout، سایدبار فارسی، مسیرها، صفحه‌ی ۴۰۴) کار می‌کند. بقیه‌ی صفحه‌ها، کامپوننت‌ها، hookها، serviceها و storeها فایل‌هایی با ساختار درست ولی خالی هستند و هر صفحه فعلاً فقط نام خودش را نشان می‌دهد.

## اجرا

پیش‌نیاز: Node.js ۲۰.۱۹ یا بالاتر. برای کار کردن با API، بک‌اند هم باید اجرا باشد (پورت ۵۰۰۰).

```bash
cp .env.example .env
npm install
npm start                # http://localhost:3000
```

| دستور | کار |
| --- | --- |
| `npm start` | سرور توسعه روی پورت ۳۰۰۰ |
| `npm run build` | ساخت نسخه‌ی تولیدی در `build/` (با `CI=true` هشدارهای ESLint هم خطا حساب می‌شوند) |

متغیرهای محیطی (`REACT_APP_API_URL`، `REACT_APP_SOCKET_URL`، `BACKEND_URL`) در [../docs/SETUP.md](../docs/SETUP.md) توضیح داده شده‌اند.

### ارتباط با بک‌اند در توسعه

کد فرانت‌اند فقط مسیرهای نسبی `/api` و `/socket.io` را صدا می‌زند. فایل `src/setupProxy.js` آن‌ها را (شامل WebSocket) به `BACKEND_URL` (پیش‌فرض `http://127.0.0.1:5000`) می‌فرستد؛ پس در توسعه به تنظیم CORS نیازی نیست. در Docker همین کار را nginx انجام می‌دهد.

## ساختار

```text
frontend/
├── public/                   # index.html (فارسی، راست‌به‌چپ)، favicon.ico، logo.svg
├── tailwind.config.js        # رنگ و فونت از متغیرهای CSS خوانده می‌شود
├── postcss.config.js         # در CRA استفاده نمی‌شود؛ برای مهاجرت‌های بعدی (مثل Vite) نگه داشته شده
└── src/
    ├── index.jsx             # نقطه‌ی ورود: Router و استایل‌ها
    ├── App.jsx               # مسیرها
    ├── setupProxy.js         # proxy سرور توسعه (فقط npm start)
    ├── components/           # به تفکیک ماژول: Layout، Auth، Order، Table، Menu، Customer، ...
    ├── pages/                # صفحه‌های اصلی
    ├── hooks/                # useAuth، useFetch، useForm، useNotification، useSocket
    ├── services/             # api.js (نمونه‌ی Axios) + یک service برای هر ماژول
    ├── store/                # storeهای Zustand
    ├── constants/            # api، order، messages، validation
    ├── utils/                # socket.js، formatters، validators، helpers، print
    └── styles/               # tailwind.css، variables.css، index.css، responsive.css
```

### مسیرها (`src/App.jsx`)

| مسیر | محتوا |
| --- | --- |
| `/login`، `/register`، `/forgot-password` | کامپوننت‌های Auth (بدون Layout) |
| `/` | `HomePage` |
| `/dashboard`، `/orders`، `/tables`، `/menu`، `/customers`، `/inventory`، `/reservations`، `/reports`، `/settings` | صفحه‌ی مربوط داخل Layout |
| `*` | `NotFoundPage` |

> `ProtectedRoute` فعلاً فقط عبور می‌دهد و احراز هویت را اعمال نمی‌کند؛ هنوز هم به مسیرها وصل نشده است.

## افزودن یک صفحه یا ماژول

۱. **service:** در `src/services/` با نمونه‌ی مشترک `api.js` درخواست‌ها را بنویسید:

```js
import api from './api';

const orderService = {
  list: (params) => api.get('/orders', { params }).then((res) => res.data),
};

export default orderService;
```

۲. **store** (در صورت نیاز به state سراسری): `src/store/orderStore.js` با Zustand.
۳. **کامپوننت‌ها:** در `src/components/<Module>/`.
۴. **صفحه:** در `src/pages/` و ثبت مسیر در `App.jsx`؛ لینک منو را در `components/Layout/Sidebar.jsx` اضافه کنید.

## استایل و راست‌به‌چپ

- جهت صفحه در `public/index.html` با `lang="fa"` و `dir="rtl"` تعیین شده است. برای فاصله و حاشیه از کلاس‌های منطقی Tailwind (`ms-*`، `me-*`، `ps-*`، `pe-*`، `border-s`، `border-e`، `text-start`) استفاده کنید تا با RTL سازگار بماند.
- رنگ اصلی و فونت در `src/styles/variables.css` تعریف و در `tailwind.config.js` به کلاس‌هایی مثل `bg-primary` و `font-sans` متصل شده‌اند.
- فونت Vazirmatn هنوز بارگذاری نمی‌شود و فعلاً Tahoma نمایش داده می‌شود.

## نکات Create React App

- **CRA دیگر نگهداری نمی‌شود.** ساختار پروژه (`public/index.html`، `src/index.jsx`) طبق معماری تعیین‌شده، همان ساختار CRA است. مسیر پیشنهادی آینده مهاجرت به Vite است: `index.html` به ریشه‌ی `frontend/` می‌رود، پیشوند `REACT_APP_` به `VITE_` تبدیل می‌شود و یک `vite.config.js` اضافه می‌شود.
- **`npm audit` ده‌ها هشدار نشان می‌دهد.** این هشدارها مربوط به ابزارهای build در CRA هستند (در بسته‌ی نهایی قرار نمی‌گیرند). **`npm audit fix --force` را اجرا نکنید**؛ `react-scripts` را به `0.0.0` برمی‌گرداند و پروژه خراب می‌شود.
- React روی نسخه‌ی ۱۸ مانده است چون CRA با React 19 درست کار نمی‌کند و Tailwind روی نسخه‌ی ۳ است چون CRA فقط همان را پشتیبانی می‌کند.
- اگر هنگام نصب بسته‌ی جدید خطای `ERESOLVE` دیدید، از `npm install <package> --legacy-peer-deps` استفاده کنید.
- فقط متغیرهای `REACT_APP_*` وارد بسته‌ی مرورگر می‌شوند؛ هیچ رازی در آن‌ها نگذارید.
