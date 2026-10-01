# فرانت‌اند — رابط کاربری سیستم مدیریت رستوران

React 18 + React Router 6 + Zustand + Tailwind CSS 3 (ساخته‌شده با Create React App)

> 🚧 **در حال توسعه:** رابط مشتری (خانه، جزئیات غذا، سبد خرید، تنظیمات؛ فارسی و راست‌به‌چپ با تم تیره و روشن) با داده‌ی آزمایشی کار می‌کند. پنل مدیریت (`/admin`) فقط پوسته دارد و صفحه‌هایش، همراه با بقیه‌ی hookها، serviceها و storeها، placeholder‌اند. عکس غذاها جای‌نگهدار است؛ [../docs/DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md) فهرست فایل‌های لازم از Figma را دارد.

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
    ├── assets/               # عکس‌های Figma: foods، categories، banners، avatars (اسلات‌ها)
    ├── components/           # به تفکیک ماژول: Layout، Common، Menu، Discount، Auth، Order، ...
    ├── pages/                # صفحه‌های اصلی
    ├── hooks/                # useAuth، useFetch، useForm، useNotification، useSocket
    ├── services/             # api.js (نمونه‌ی Axios) + service هر ماژول؛ mock/ داده‌ی آزمایشی منو
    ├── store/                # storeهای Zustand (uiStore: تم، cartStore: سبد خرید)
    ├── constants/            # api، order، messages، validation
    ├── utils/                # socket.js، formatters، validators، helpers، print
    └── styles/               # tailwind.css، variables.css (توکن‌های تم)، index.css، responsive.css
```

### مسیرها (`src/App.jsx`)

| مسیر | محتوا |
| --- | --- |
| `/` | خانه‌ی مشتری (`HomePage`) |
| `/food/:id` | جزئیات غذا (بدون نوار پایین) |
| `/cart` | سبد خرید |
| `/settings` | تنظیمات مشتری و تغییر تم |
| `/messages`، `/profile`، `/notifications`، `/menu`، `/offers` | «به‌زودی» |
| `/admin`، `/admin/dashboard`، `orders`، `tables`، `menu`، `customers`، `inventory`، `reservations`، `reports`، `settings` | پنل مدیریت داخل `Layout` |
| `/login`، `/register`، `/forgot-password` | کامپوننت‌های Auth (بدون Layout) |
| هر مسیر دیگر | ۴۰۴ (مشتری) / ۴۰۴ پنل مدیریت زیر `/admin` |

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
۴. **صفحه:** در `src/pages/` و ثبت مسیر در `App.jsx`؛ برای پنل مدیریت لینک منو را در `components/Layout/Sidebar.jsx` و برای مشتری در `components/Layout/BottomNav.jsx` اضافه کنید.

## استایل، تم و راست‌به‌چپ

- جهت صفحه در `public/index.html` با `lang="fa"` و `dir="rtl"` تعیین شده است. برای فاصله و حاشیه از کلاس‌های منطقی Tailwind (`ms-*`، `me-*`، `ps-*`، `pe-*`، `start-*`، `end-*`، `text-start`) استفاده کنید تا با RTL سازگار بماند.
- **رنگ را فقط از توکن‌ها بخوانید:** کلاس‌های `ui-*` (مثل `bg-ui-card`، `text-ui-muted`، `bg-ui-cta`) به متغیرهای `--ui-*` در `src/styles/variables.css` وصل‌اند و با تم عوض می‌شوند. پنل مدیریت از `bg-primary` و رنگ‌های slate استفاده می‌کند و تم را دنبال نمی‌کند.
- **تم:** `useUiStore` (`theme`، `toggleTheme`، `setTheme`) انتخاب را در `localStorage` نگه می‌دارد و `data-theme` را روی `<html>` می‌گذارد. دکمه‌ها: `Common/ThemeToggle` (آیکنی) و `ThemeSwitch` (کلید در تنظیمات). تم پیش‌فرض تیره است.
- **آیکن‌ها:** همه از `Common/Icon` با نام منطقی (`<Icon name="bell" />`)؛ برای عوض‌کردن آیکن فقط همان‌جا را تغییر دهید.
- **فونت:** Vazirmatn متغیر، از بسته‌ی npm (`src/index.jsx`).
- **اعداد:** برای نمایش عدد و قیمت از `utils/formatters.js` استفاده کنید (ارقام فارسی، `تومان`).

## Asset ها (عکس‌های Figma)

عکس‌ها از `src/assets/foods`، `categories`، `banners` و `avatars` با **نام فایل = slug** خوانده می‌شوند. فایل خروجی Figma را با نام درست در پوشه بگذارید و برنامه را دوباره اجرا کنید؛ بدون تغییر کد جای‌نگهدار را عوض می‌کند. نام‌ها و اندازه‌های پیشنهادی: [../docs/DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md).

## نکات Create React App

- **CRA دیگر نگهداری نمی‌شود.** ساختار پروژه (`public/index.html`، `src/index.jsx`) طبق معماری تعیین‌شده، همان ساختار CRA است. مسیر پیشنهادی آینده مهاجرت به Vite است: `index.html` به ریشه‌ی `frontend/` می‌رود، پیشوند `REACT_APP_` به `VITE_` تبدیل می‌شود و یک `vite.config.js` اضافه می‌شود.
- **`npm audit` ده‌ها هشدار نشان می‌دهد.** این هشدارها مربوط به ابزارهای build در CRA هستند (در بسته‌ی نهایی قرار نمی‌گیرند). **`npm audit fix --force` را اجرا نکنید**؛ `react-scripts` را به `0.0.0` برمی‌گرداند و پروژه خراب می‌شود.
- React روی نسخه‌ی ۱۸ مانده است چون CRA با React 19 درست کار نمی‌کند و Tailwind روی نسخه‌ی ۳ است چون CRA فقط همان را پشتیبانی می‌کند.
- اگر هنگام نصب بسته‌ی جدید خطای `ERESOLVE` دیدید، از `npm install <package> --legacy-peer-deps` استفاده کنید.
- فقط متغیرهای `REACT_APP_*` وارد بسته‌ی مرورگر می‌شوند؛ هیچ رازی در آن‌ها نگذارید.
