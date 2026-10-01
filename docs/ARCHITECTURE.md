# معماری سیستم

این سند ساختار کلی پروژه، لایه‌های بک‌اند و فرانت‌اند، جریان داده و تصمیم‌های فنی را شرح می‌دهد. بخش‌هایی که هنوز پیاده‌سازی نشده‌اند صریحاً با «برنامه‌ریزی‌شده» مشخص شده‌اند.

## نمای کلی

```text
 ┌──────────────────────┐   REST /api (JSON)         ┌──────────────────────┐   Mongoose   ┌─────────┐
 │ Frontend (browser)   │ ─────────────────────────► │ Backend              │ ───────────► │ MongoDB │
 │ React + Tailwind     │                            │ Express + Socket.io  │              └─────────┘
 │                      │ ◄──── Socket.io events ──► │                      │ ───────────► SMS / ZarinPal / SMTP
 └──────────────────────┘                            └──────────────────────┘              (planned)
```

REST برای درخواست و پاسخ معمولی و Socket.io برای رویدادهای لحظه‌ای (دوطرفه) استفاده می‌شود. اتصال به سرویس‌های بیرونی (پیامک، ZarinPal، ایمیل) برنامه‌ریزی‌شده است.

- **فرانت‌اند** یک SPA است و فقط با بک‌اند ارتباط دارد؛ هیچ‌وقت مستقیم به دیتابیس یا سرویس‌های بیرونی وصل نمی‌شود.
- **بک‌اند** تنها نقطه‌ی دسترسی به MongoDB و سرویس‌های بیرونی است.
- مرورگر همیشه با مسیرهای نسبی `/api` و `/socket.io` کار می‌کند. در توسعه `src/setupProxy.js` و در Docker nginx آن‌ها را به بک‌اند می‌رساند؛ بنابراین مرورگر فقط با یک origin سروکار دارد و به CORS نیاز ندارد.

## بک‌اند

### مسیر اجرا

`server.js` نقطه‌ی شروع است و به ترتیب این کارها را انجام می‌دهد:

1. اتصال به MongoDB (`config/database.js`؛ اگر در ۱۰ ثانیه وصل نشود، سرور با کد خروج ۱ متوقف می‌شود).
2. ساخت سرور HTTP از روی برنامه‌ی Express (`src/app.js`).
3. اتصال Socket.io به همان سرور (CORS بر اساس `CLIENT_URL`) و قراردادن آن در `app.set('io', io)` تا controllerها با `req.app.get('io')` به آن دسترسی داشته باشند.
4. برای هر اتصال جدید، فراخوانی `registerOrderSocket`، `registerTableSocket` و `registerNotificationSocket`.
5. شروع شنود روی `PORT` و ثبت خاموشی تمیز برای `SIGINT` و `SIGTERM` (بستن اتصال‌ها و سپس MongoDB؛ حداکثر ۱۰ ثانیه).

### چرخه‌ی یک درخواست HTTP

ترتیب middlewareها در `src/app.js`:

```text
helmet → cors → logger (morgan) → express.json → express.urlencoded
       → /api  (routes/index.js → routes/<ماژول>.routes.js → middleware → controller)
       → notFound → errorHandler
```

۱. `routes/index.js` همه‌ی routerها را زیر پیشوند `/api` سوار می‌کند و مسیر `GET /api/health` را دارد.
۲. هر `routes/<ماژول>.routes.js` مسیر را به middlewareها (احراز هویت، اعتبارسنجی) و سپس به controller می‌رساند.
۳. controller ورودی را از `req` می‌گیرد، service یا model را صدا می‌زند و پاسخ JSON می‌سازد.
۴. هر درخواستی که به route نخورد، توسط `notFound` به خطای ۴۰۴ تبدیل می‌شود و همه‌ی خطاها (از جمله خطای promise در handlerهای `async` که Express 5 خودش منتقل می‌کند) به `errorHandler` می‌رسند.

### لایه‌ها

| لایه | پوشه | مسئولیت | قاعده |
| --- | --- | --- | --- |
| Config | `config/` | `env.js` (متغیرهای محیطی)، `database.js` (اتصال)، `constants.js` (ثابت‌ها) | تنها جایی است که `process.env` خوانده می‌شود |
| Routes | `routes/` | نگاشت متد و آدرس HTTP به middleware و controller | بدون لاجیک کسب‌وکار |
| Middleware | `middleware/` | `auth`، `validation`، `errorHandler`، `logger`، `cors` | `auth` هنوز پیاده‌سازی نشده است |
| Controllers | `controllers/` | لاجیک هر درخواست: ورودی، فراخوانی service/model، پاسخ | هر ماژول یک controller |
| Services | `services/` | کارهای پیچیده و سرویس‌های بیرونی: پیامک، پرداخت، ایمیل، چاپ فیش، گزارش | مستقل از Express (بدون `req`/`res`) |
| Models | `models/` | Schema و دسترسی به داده با Mongoose | یک فایل برای هر collection |
| Utils | `utils/` | توابع کمکی، JWT، فرمت‌کننده‌ها، اعتبارسنج‌ها | توابع خالص و قابل‌آزمون |
| Socket | `socket/` | رویدادهای لحظه‌ای سفارش، میز و اعلان | هر فایل `(io, socket) => {}` را export می‌کند |

### قالب پاسخ خطا

همه‌ی خطاها به شکل JSON برگردانده می‌شوند (جزئیات در [API_DOCUMENTATION.md](API_DOCUMENTATION.md)):

```json
{ "success": false, "message": "Not found: GET /api/nope", "stack": "..." }
```

در حالت production فیلد `stack` حذف می‌شود و پیام خطاهای ۵xx به `Internal server error` تبدیل می‌شود.

### Socket.io

اتصال Socket.io برقرار است و برای هر کلاینت سه ماژول ثبت می‌شود، ولی فعلاً هیچ رویدادی تعریف نشده است. قرارداد پیشنهادی برای نام رویدادها `<ماژول>:<رویداد>` است، مثلاً `order:created`، `order:status-changed`، `table:status-changed` و `notification:new`.

### امنیت

- `helmet` هدرهای امنیتی را تنظیم می‌کند.
- CORS فقط origin(های) فهرست‌شده در `CLIENT_URL` را مجاز می‌کند.
- رازها فقط از متغیرهای محیطی می‌آیند؛ در production نبودن `JWT_SECRET` یا ماندن مقدار نمونه‌ی آن باعث توقف راه‌اندازی می‌شود.
- **برنامه‌ریزی‌شده:** احراز هویت با JWT (`Authorization: Bearer <token>`)، نقش‌های `manager` / `employee` / `customer` (ثابت `ROLES` تعریف شده است)، اعتبارسنجی ورودی‌ها و محدودیت نرخ درخواست.

## فرانت‌اند

### ساختار و جریان داده

```text
Page (pages/) ─► Components (components/<module>/) ─► Hooks (hooks/) / Store (store/)
                                                            │
                                                            ▼
                    Services (services/*Service.js) ─► api.js (Axios instance) ─► /api
                    utils/socket.js (Socket.io, autoConnect: false)            ─► /socket.io
```

- **Pages:** هر صفحه یک مسیر در `App.jsx` است. صفحه‌های مشتری داخل `CustomerLayout` (ستون تا ۴۳۰ پیکسل و نوار پایین) و صفحه‌های مدیریت زیر `/admin` داخل `Layout` (هدر، سایدبار، فوتر) نمایش داده می‌شوند.
- **Components:** به تفکیک ماژول (Order، Table، Menu، Customer، Inventory، Discount، Reservation، SMS، Dashboard، Reports، Payment، Auth، Settings، Common، Layout). کامپوننت‌های پایه‌ی مشترک (Icon، Button، Input، QuantityStepper، FoodImage، Avatar، Badge، ThemeToggle، EmptyState، Loading، SectionHeader) در `Common` هستند؛ بخش‌های رابط مشتری در `Menu` (جستجو، دسته‌ها، کارت و فهرست غذا)، `Discount` (بنر پیشنهاد) و `Layout` (CustomerLayout، BottomNav، CustomerHeader، PageHeader).
- **Services:** هر فایل فراخوانی‌های API یک ماژول را کپسوله می‌کند و باید از نمونه‌ی مشترک `api.js` استفاده کند، نه مستقیم از axios. `menuService` فعلاً داده‌ی آزمایشی (`services/mock/menu.mock.js`) را با همان امضای async یک API واقعی برمی‌گرداند؛ با آماده شدن بک‌اند فقط بدنه‌ی توابع عوض می‌شود.
- **Store:** state سراسری با Zustand: `uiStore` (تم تیره/روشن، در localStorage) و `cartStore` (سبد خرید مشتری، در localStorage) پیاده شده‌اند؛ `authStore`، `orderStore`، `tableStore`، `menuStore`، `customerStore` و `notificationStore` هنوز placeholder‌اند.
- **Socket:** نمونه‌ی منفرد `utils/socket.js` خودکار وصل نمی‌شود؛ بعد از ورود کاربر باید `socket.connect()` صدا زده شود (در `hooks/useSocket.js`، برنامه‌ریزی‌شده).

### مسیرها

| مسیر | محتوا |
| --- | --- |
| `/` | خانه‌ی مشتری (`HomePage`) در `CustomerLayout` |
| `/food/:id` | جزئیات غذا (`FoodDetailPage`)؛ بدون نوار پایین |
| `/cart` | سبد خرید (`CartPage`) |
| `/settings` | تنظیمات مشتری و تغییر تم (`AccountSettingsPage`) |
| `/messages`، `/profile`، `/notifications`، `/menu`، `/offers` | `ComingSoonPage` |
| هر مسیر ناشناخته‌ی دیگر | `CustomerNotFoundPage` (۴۰۴ هم‌تم) |
| `/admin` | پنل مدیریت در `Layout`؛ به `/admin/dashboard` هدایت می‌شود |
| `/admin/dashboard`، `orders`، `tables`، `menu`، `customers`، `inventory`، `reservations`، `reports`، `settings` | صفحه‌های مدیریت (placeholder) |
| `/admin/*` ناشناخته | `NotFoundPage` (۴۰۴ پنل مدیریت) |
| `/login`، `/register`، `/forgot-password` | عمومی، بدون Layout |

`ProtectedRoute` برای محافظت از مسیرها ساخته شده ولی فعلاً فقط عبور می‌دهد (احراز هویت را اعمال نمی‌کند) و هنوز به مسیرها وصل نشده است؛ پنل مدیریت فعلاً بدون ورود در دسترس است.

### استایل و فارسی‌سازی

- `public/index.html` با `lang="fa"` و `dir="rtl"` تعریف شده است؛ برای فاصله و حاشیه از ویژگی‌های منطقی Tailwind (مثل `border-e`، `ms-*`، `ps-*`، `start-*`) استفاده کنید تا با RTL سازگار بماند.
- فونت Vazirmatn (متغیر) از بسته‌ی npm و بدون CDN بارگذاری می‌شود (`src/index.jsx`).
- توکن‌های طراحی در `styles/variables.css` تعریف و در `tailwind.config.js` به کلاس‌های `ui-*` وصل شده‌اند (جزئیات و جدول رنگ‌ها: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)).
- اعداد با رقم فارسی و جداکننده‌ی هزارگان در `utils/formatters.js` فرمت می‌شوند؛ نمایش تاریخ شمسی هنوز پیاده نشده است (برنامه‌ریزی‌شده).

### تم تیره و روشن

رابط مشتری دو تم دارد که با ویژگی `data-theme` روی `<html>` انتخاب می‌شوند. `store/uiStore.js` انتخاب را در `localStorage` نگه می‌دارد و یک اسکریپت کوچک در `public/index.html` تم ذخیره‌شده را پیش از اولین رندر اعمال می‌کند (بدون پرش رنگ). پنل مدیریت ظاهر روشن ثابت خودش را دارد و از تم مشتری پیروی نمی‌کند.

### Asset ها و داده‌ی آزمایشی

- عکس‌های غذا، آیکن دسته‌ها، بنر و آواتار از `src/assets/<گروه>/` با نام فایل = slug خوانده می‌شوند (`src/assets/index.js`)؛ تا وقتی فایل نیست، کامپوننت‌ها جای‌نگهدار نشان می‌دهند و چیدمان تغییر نمی‌کند. فهرست کامل slugها در [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
- منو، دسته‌ها و پیشنهادها فعلاً از `services/mock/menu.mock.js` می‌آیند.

## استقرار با Docker

```text
browser ──► frontend (nginx :80, host port 3000)
              ├─ /            built React app (SPA: unknown paths fall back to index.html)
              ├─ /api/        ──► backend:5000
              └─ /socket.io/  ──► backend:5000   (WebSocket upgrade)
                                     └──► mongo:27017   (Compose network only, volume: mongo-data)
```

- `docker/Dockerfile.backend`: ایمیج `node:22-alpine`، فقط وابستگی‌های production، اجرا با کاربر غیر root.
- `docker/Dockerfile.frontend`: build چندمرحله‌ای (build با Node، سرو با nginx) و پیکربندی nginx داخل خود Dockerfile.
- `docker/docker-compose.yml`: سرویس‌های `mongo`، `backend` و `frontend` با healthcheck و وابستگی به ترتیب.
- context ساخت هر دو ایمیج ریشه‌ی مخزن است؛ فایل `.dockerignore` در ریشه، `node_modules`، `build` و فایل‌های `.env` را از context بیرون نگه می‌دارد.

راه‌اندازی در [SETUP.md](SETUP.md) توضیح داده شده است.

## تصمیم‌های فنی

| موضوع | انتخاب | دلیل و نکته |
| --- | --- | --- |
| Backend | Express 5، Mongoose 9، Node ≥ 20.19 | نسخه‌های اصلی فعلی. Mongoose 9: hookهای `pre` بدون `next` و به‌صورت `async`؛ `returnDocument: 'after'` به‌جای `new: true` |
| ماژول‌های بک‌اند | CommonJS | با ساختار و ابزارهای پروژه سازگار است (`require` / `module.exports`) |
| ابزار build فرانت‌اند | Create React App (`react-scripts` 5) | ساختار `public/index.html` و `src/index.jsx` در معماری پروژه همان ساختار CRA است. CRA دیگر نگهداری نمی‌شود و `npm audit` برای ابزارهای build آن هشدار می‌دهد؛ مسیر پیشنهادی آینده: مهاجرت به Vite |
| React | 18.3 | CRA با React 19 به‌درستی کار نمی‌کند |
| استایل | Tailwind CSS 3.4 | CRA فقط Tailwind 3 را پشتیبانی می‌کند. فایل `postcss.config.js` در CRA استفاده نمی‌شود ولی برای مهاجرت‌های بعدی (مثل Vite) نگه داشته شده است |
| state سراسری | Zustand | سبک و بدون boilerplate؛ جایگزین Redux |
| تم | متغیرهای CSS + ویژگی `data-theme` | تغییر تم بدون رندر دوباره‌ی کامپوننت‌ها؛ کلاس‌های `ui-*` در Tailwind فقط به متغیرها اشاره می‌کنند |
| آیکن‌ها | lucide-react پشت `Common/Icon` | یک نقطه‌ی تغییر؛ آیکن‌های جهت‌دار در RTL خودکار برعکس می‌شوند |
| فونت | Vazirmatn متغیر (npm) | بدون CDN و با وزن‌های ۱۰۰ تا ۹۰۰ در یک فایل |
| عکس‌ها | اسلات‌های `src/assets/<گروه>/<slug>` | عکس‌های Figma بدون تغییر کد جایگزین جای‌نگهدارها می‌شوند |
| ارتباط با API | Axios با یک نمونه‌ی مشترک | امکان افزودن interceptor برای توکن و خطاها در یک نقطه |
| proxy توسعه | `src/setupProxy.js` | فیلد `proxy` در `package.json` روی ماشین‌های بدون IP شبکه‌ی محلی باعث خطای راه‌اندازی و روی پیش‌نمایش‌های ابری باعث `Invalid Host header` می‌شود و WebSocket را هم مطمئن proxy نمی‌کند |
| Docker | nginx برای فرانت‌اند | سرو فایل‌های ثابت، fallback مسیرهای SPA و proxy همین‌مبدأ برای `/api` و `/socket.io` |
