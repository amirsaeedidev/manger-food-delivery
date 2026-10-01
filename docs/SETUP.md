# راهنمای نصب و راه‌اندازی

این راهنما نصب و اجرای پروژه را روی سیستم توسعه توضیح می‌دهد: ابتدا اجرای مستقیم (بدون Docker) و سپس اجرای کل مجموعه با Docker Compose.

## پیش‌نیازها

| ابزار | نسخه | یادداشت |
| --- | --- | --- |
| Node.js | ۲۰.۱۹ یا بالاتر (نسخه‌ای که پروژه با آن آزموده شده: ۲۲ LTS) | حداقل نسخه‌ی موردنیاز Mongoose 9؛ در بخش `engines` فایل `backend/package.json` هم ثبت شده است |
| npm | همراه Node.js | |
| MongoDB | نسخه‌ی پایدار فعلی (Docker Compose از نسخه‌ی ۸ استفاده می‌کند) | نصب محلی یا با Docker |
| Git | | |
| Docker | ۲۳ یا بالاتر، همراه Compose نسخه‌ی ۲.۲۴ یا بالاتر | فقط برای اجرای Docker (اختیاری) |

## دریافت پروژه

```bash
git clone https://github.com/amirsaeedidev/manger-food-delivery.git
cd manger-food-delivery
```

## متغیرهای محیطی

هر بخش فایل `.env.example` دارد. آن را به `.env` کپی کنید (در PowerShell ویندوز: `Copy-Item .env.example .env`). فایل‌های `.env` در `.gitignore` هستند و هرگز نباید کامیت شوند.

### بک‌اند — `backend/.env`

| متغیر | پیش‌فرض | توضیح |
| --- | --- | --- |
| `NODE_ENV` | `development` | در حالت `production` وجود `MONGODB_URI` و `JWT_SECRET` الزامی است، پیام خطاهای ۵xx عمومی می‌شود و stack trace در پاسخ نمی‌آید |
| `PORT` | `5000` | پورت سرور |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/restaurant-management` | آدرس اتصال MongoDB |
| `CLIENT_URL` | `http://localhost:3000` | origin(های) مجاز برای CORS و Socket.io؛ چند مقدار را با ویرگول جدا کنید |
| `JWT_SECRET` | — | کلید امضای توکن. در production الزامی است و نباید با `change-me` شروع شود. تولید مقدار تصادفی: `openssl rand -hex 32`. در development اگر خالی باشد، یک کلید تصادفی موقت ساخته می‌شود و با هر ری‌استارت توکن‌ها باطل می‌شوند |
| `JWT_EXPIRES_IN` | `7d` | مدت اعتبار توکن |
| `SMS_PROVIDER` | `kavenegar` | `kavenegar` یا `smsir` |
| `KAVENEGAR_API_KEY`، `KAVENEGAR_SENDER` | خالی | تنظیمات کاوه‌نگار |
| `SMSIR_API_KEY`، `SMSIR_LINE_NUMBER` | خالی | تنظیمات sms.ir |
| `ZARINPAL_MERCHANT_ID` | خالی | مرچنت‌کد زرین‌پال |
| `ZARINPAL_CALLBACK_URL` | `http://localhost:3000/payment/verify` (در `.env.example`) | آدرس بازگشت مشتری از درگاه (مقدار نمونه) |
| `ZARINPAL_SANDBOX` | `true` | محیط آزمایشی زرین‌پال؛ در production برابر `false` شود |
| `SMTP_HOST`، `SMTP_PORT`، `SMTP_USER`، `SMTP_PASS`، `EMAIL_FROM` | `SMTP_PORT=587`، بقیه خالی | ارسال ایمیل |

> تنظیمات پیامک، پرداخت و ایمیل فعلاً فقط در `backend/src/config/env.js` خوانده می‌شوند؛ سرویس‌های مربوط به آن‌ها هنوز پیاده‌سازی نشده‌اند.

### فرانت‌اند — `frontend/.env`

| متغیر | پیش‌فرض | توضیح |
| --- | --- | --- |
| `REACT_APP_API_URL` | `/api` | آدرس پایه‌ی API. مسیر نسبی `/api` در توسعه توسط `src/setupProxy.js` و در Docker توسط nginx به بک‌اند می‌رسد |
| `REACT_APP_SOCKET_URL` | خالی | آدرس Socket.io. خالی یعنی همان origin صفحه (آن هم proxy می‌شود) |
| `BACKEND_URL` | `http://127.0.0.1:5000` | فقط در توسعه: مقصد proxy برای `/api` و `/socket.io` (به مرورگر داده نمی‌شود) |

فقط متغیرهای با پیشوند `REACT_APP_` وارد بسته‌ی مرورگر می‌شوند و در دسترس همه‌ی بازدیدکنندگان‌اند؛ هیچ رازی در آن‌ها نگذارید. بعد از هر تغییر `.env`، `npm start` را دوباره اجرا کنید.

## اجرا بدون Docker

### ۱) MongoDB

با نصب محلی، یا با Docker:

```bash
docker run -d --name restaurant-mongo -p 27017:27017 -v restaurant-mongo-data:/data/db mongo:8
```

### ۲) بک‌اند

```bash
cd backend
cp .env.example .env
npm install
npm run dev        # با nodemon؛ برای اجرای ساده: npm start
```

در ترمینال این دو خط باید دیده شود:

```text
MongoDB connected: 127.0.0.1:27017/restaurant-management
Server running in development mode on port 5000
```

بررسی سلامت:

```bash
curl http://localhost:5000/api/health
# {"success":true,"status":"ok","uptime":12.3,"timestamp":"2026-01-01T10:00:00.000Z"}
```

### ۳) فرانت‌اند

در ترمینال دیگر:

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

سایت مشتری روی <http://localhost:3000> و پنل مدیریت روی <http://localhost:3000/admin> باز می‌شود (رابط مشتری فعلاً با داده‌ی آزمایشی کار می‌کند و به بک‌اند نیاز ندارد). درخواست‌های `/api` و `/socket.io` در حالت توسعه به بک‌اند (پورت ۵۰۰۰) proxy می‌شوند؛ پس نیازی به تنظیم CORS یا آدرس API نیست. اگر بک‌اند روی پورت دیگری اجرا می‌شود، `BACKEND_URL` را در `frontend/.env` تغییر دهید.

### ساخت نسخه‌ی تولیدی فرانت‌اند

```bash
cd frontend
npm run build      # خروجی: frontend/build/
```

در محیط CI (`CI=true`) هر هشدار ESLint باعث شکست build می‌شود.

## اجرا با Docker Compose

۱. فایل تنظیمات بک‌اند را بسازید:

```bash
cp backend/.env.example backend/.env
```

۲. در `backend/.env` مقدار `JWT_SECRET` را با یک رشته‌ی تصادفی بلند جایگزین کنید (خروجی `openssl rand -hex 32`). در Docker بک‌اند در حالت production اجرا می‌شود و مقدار نمونه‌ی `change-me` را رد می‌کند.

۳. ساخت و اجرا (از ریشه‌ی پروژه):

```bash
docker compose -f docker/docker-compose.yml up --build
```

۴. بعد از بالا آمدن سرویس‌ها:

- رابط کاربری: <http://localhost:3000>
- بررسی سلامت API: <http://localhost:5000/api/health>

دستورهای مفید:

```bash
docker compose -f docker/docker-compose.yml ps                # وضعیت سرویس‌ها
docker compose -f docker/docker-compose.yml logs -f backend   # لاگ بک‌اند
docker compose -f docker/docker-compose.yml down              # توقف (داده‌ها می‌مانند)
docker compose -f docker/docker-compose.yml down -v           # توقف و حذف دیتابیس (برگشت‌ناپذیر!)
```

| سرویس | پورت روی میزبان | توضیح |
| --- | --- | --- |
| `frontend` | `3000` | nginx؛ فایل‌های ساخته‌شده‌ی React را سرو می‌کند و `/api` و `/socket.io` را به بک‌اند می‌فرستد |
| `backend` | `5000` | API و Socket.io |
| `mongo` | منتشر نمی‌شود | فقط از داخل شبکه‌ی Compose در دسترس است؛ برای اتصال از بیرون (مثلاً Compass) خطوط کامنت‌شده‌ی `ports` در `docker-compose.yml` را فعال کنید |

مقادیر `NODE_ENV`، `PORT`، `MONGODB_URI` و `CLIENT_URL` در `docker-compose.yml` تعیین شده‌اند و بر `backend/.env` اولویت دارند. بقیه‌ی تنظیمات (JWT، پیامک، زرین‌پال، SMTP) از `backend/.env` خوانده می‌شوند.

> ⚠️ این Compose برای اجرای محلی و نمایشی است. برای استقرار واقعی به HTTPS (پشت یک reverse proxy)، فعال‌سازی احراز هویت MongoDB، پشتیبان‌گیری از volume با نام `mongo-data` و مدیریت امن رازها نیاز دارید.

## عیب‌یابی

| نشانه | علت و راه‌حل |
| --- | --- |
| `Failed to start the server: connect ECONNREFUSED 127.0.0.1:27017` | MongoDB اجرا نیست یا `MONGODB_URI` اشتباه است. بک‌اند بعد از حداکثر ۱۰ ثانیه با کد خروج ۱ متوقف می‌شود |
| `Missing required environment variables: MONGODB_URI, JWT_SECRET` | `NODE_ENV=production` است ولی این متغیرها تنظیم نشده‌اند |
| `JWT_SECRET still has the example value ...` | مقدار `change-me` را با یک رشته‌ی تصادفی عوض کنید (`openssl rand -hex 32`) |
| `JWT_SECRET is not set: using a temporary random secret` | فقط هشدار حالت development است؛ برای ماندگاری توکن‌ها `JWT_SECRET` را تنظیم کنید |
| `EADDRINUSE: address already in use :::5000` | برنامه‌ی دیگری از پورت استفاده می‌کند. `PORT` را در `backend/.env` و `BACKEND_URL` را در `frontend/.env` عوض کنید |
| خطای نسخه‌ی Node در `npm install` | Node.js را به ۲۰.۱۹ یا بالاتر ارتقا دهید |
| فراخوانی‌های `/api` در فرانت‌اند خطای شبکه یا ۵۰۲ می‌دهند | بک‌اند اجرا نیست یا `BACKEND_URL` به آدرس درستی اشاره نمی‌کند |
| هشدار `DEP0060 util._extend` هنگام `npm start` | هشدار شناخته‌شده‌ی وابستگی‌های Create React App روی Node جدید است و بی‌خطر است |
| `npm audit` در فرانت‌اند ده‌ها هشدار نشان می‌دهد | مربوط به ابزارهای build در Create React App است (در بسته‌ی نهایی نیستند). **`npm audit fix --force` را اجرا نکنید**؛ `react-scripts` را به نسخه‌ی `0.0.0` برمی‌گرداند و پروژه خراب می‌شود. راه‌حل اصولی مهاجرت به Vite است |
| `ERESOLVE` هنگام نصب بسته‌ی جدید در فرانت‌اند | تداخل peer dependency در درخت CRA است؛ از `npm install <package> --legacy-peer-deps` استفاده کنید |
| Docker: خطا درباره‌ی `env_file` و `required` | نسخه‌ی Compose قدیمی است (کمتر از ۲.۲۴). آن را به‌روز کنید یا ساختار `env_file` را به شکل ساده‌ی یک رشته (`../backend/.env`) تغییر دهید و فایل را حتماً بسازید |
| Docker: کانتینر `backend` بلافاصله خارج می‌شود | معمولاً `JWT_SECRET` تنظیم نشده یا هنوز `change-me` است. خروجی `docker compose -f docker/docker-compose.yml logs backend` را ببینید |
