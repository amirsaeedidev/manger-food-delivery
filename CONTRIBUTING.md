# راهنمای مشارکت

ممنون که در توسعه‌ی این پروژه مشارکت می‌کنید. این راهنما قواعد کار تیمی را کوتاه و عملی توضیح می‌دهد.

## شروع کار

۱. پروژه را clone کنید و طبق [docs/SETUP.md](docs/SETUP.md) بک‌اند و فرانت‌اند را اجرا کنید.
۲. برای هر کار یک branch جدید از `main` بسازید (مستقیم روی `main` کار نکنید).
۳. تغییرات را در کامیت‌های کوچک و مرتبط انجام دهید و در پایان Pull Request باز کنید.

### نام branch

```text
feature/<ماژول>-<توضیح-کوتاه>     مثال: feature/orders-kitchen-display
fix/<ماژول>-<توضیح-کوتاه>         مثال: fix/tables-status-update
docs/<توضیح-کوتاه>
chore/<توضیح-کوتاه>
```

### پیام کامیت

از قالب [Conventional Commits](https://www.conventionalcommits.org/) استفاده می‌کنیم. پیام کامیت را به انگلیسی و کوتاه بنویسید:

```text
<type>(<scope>): <description>

feat(orders): add order creation endpoint
fix(tables): prevent double reservation of a table
docs: describe the SMS service setup
chore(docker): pin the mongo image version
```

نوع‌های رایج: `feat`، `fix`، `docs`، `refactor`، `style`، `test`، `chore`. scope معمولاً نام ماژول یا بخش است (`orders`، `menu`، `frontend`، `docker`، …).

## قراردادهای کد

- **قالب‌بندی:** ۲ فاصله برای تورفتگی، سمی‌کالن، کوتیشن تکی، و یک خط خالی در انتهای هر فایل.
- **زبان:** نام متغیرها، تابع‌ها و فایل‌ها انگلیسی است. کامنت‌ها فارسی یا انگلیسی می‌توانند باشند.
- **ماژول‌ها:** بک‌اند با CommonJS (`require` / `module.exports`) و فرانت‌اند با ES Modules (`import` / `export`) نوشته می‌شود.

### نام‌گذاری فایل‌ها

| محل | قاعده | مثال |
| --- | --- | --- |
| `backend/src/models` | `PascalCase` و مفرد | `Order.js`، `MenuItem.js` |
| `backend/src/routes` | `<منبع>.routes.js` | `orders.routes.js` |
| `backend/src/controllers` | `<موضوع>Controller.js` | `orderController.js` |
| `backend/src/services` | `<موضوع>Service.js` | `smsService.js` |
| `backend/src/middleware` | `<موضوع>.middleware.js` | `auth.middleware.js` |
| `frontend/src/components` | `PascalCase.jsx` داخل پوشه‌ی ماژول | `Order/OrderForm.jsx` |
| `frontend/src/hooks` | `useXxx.js` | `useAuth.js` |
| `frontend/src/services` | `<موضوع>Service.js` | `orderService.js` |
| `frontend/src/store` | `<موضوع>Store.js` (خروجی: `useXxxStore`) | `authStore.js` |
| `frontend/src/constants` | `<موضوع>.constants.js` | `api.constants.js` |

## افزودن یک ماژول جدید

بک‌اند (به ترتیب):

1. مدل را در `models/` بسازید.
2. handlerها را در `controllers/` بنویسید (فقط لاجیک؛ بدون وابستگی به Express در توابع کمکی).
3. مسیرها را در `routes/<منبع>.routes.js` تعریف کنید و در `routes/index.js` با `router.use('/<منبع>', ...)` وصل کنید.
4. اگر به سرویس بیرونی نیاز است، آن را در `services/` پیاده کنید.
5. اگر رویداد لحظه‌ای لازم است، در `socket/` ثبت کنید.

فرانت‌اند: `services/` (فراخوانی API) ← `store/` (در صورت نیاز به state سراسری) ← `components/<ماژول>/` ← `pages/` ← مسیر در `App.jsx` و لینک در `Sidebar.jsx`.

## نکات مهم فنی

- **Mongoose 9:** در hookهای `pre` پارامتر `next` وجود ندارد؛ آن‌ها را به‌صورت تابع `async` بنویسید (`schema.pre('save', async function () { ... })`). برای برگرداندن سند به‌روزشده از `returnDocument: 'after'` به‌جای `new: true` استفاده کنید.
- **متغیرهای محیطی** فقط در `backend/src/config/env.js` خوانده می‌شوند؛ در بقیه‌ی کد از همان ماژول import کنید.
- **اکسپرس ۵:** خطاهای promise در handlerهای `async` خودکار به `errorHandler` می‌رسند؛ نیازی به `try/catch` فقط برای فرستادن خطا نیست.
- **رابط کاربری (فرانت‌اند):**
  - رنگ‌ها را از کلاس‌های `ui-*` بخوانید (نه کد hex) تا هر دو تم کار کند، و از ویژگی‌های منطقی (`ps-*`، `ms-*`، `start-*`) استفاده کنید تا RTL به هم نریزد.
  - آیکن‌ها را از `Common/Icon` بگیرید، عدد و قیمت را با `utils/formatters.js` فرمت کنید و عکس‌ها را با `FoodImage` / `Avatar` نشان دهید (از اسلات‌های `src/assets` می‌خوانند).
  - اندازه‌های صفحه‌هایی که از روی طرح ساخته شده‌اند در [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) ثبت است؛ عددی را که عوض می‌کنید همان‌جا هم اصلاح کنید.
- **ماژول‌های هنوز پیاده‌نشده** (مثل `auth.middleware.js`) عمداً چیزی export نمی‌کنند تا استفاده‌ی اشتباه به‌جای دورزدن بی‌صدای احراز هویت، با خطا همراه باشد.

## امنیت

- فایل `.env` و هر کلید/رمز واقعی را **هرگز** کامیت نکنید. فقط `.env.example` (با مقدار نمونه) در مخزن است و `.env` در `.gitignore` قرار دارد.
- اگر به‌اشتباه رازی کامیت شد، آن را فوراً در سرویس مربوطه (پنل پیامک، زرین‌پال، …) عوض کنید؛ حذف کامیت به‌تنهایی کافی نیست.
- در فرانت‌اند هیچ رازی نگذارید: هر متغیر `REACT_APP_*` داخل بسته‌ی نهایی و در دسترس همه است.

## چک‌لیست Pull Request

- [ ] پروژه (بک‌اند و فرانت‌اند) بدون خطا اجرا می‌شود و `npm run build` فرانت‌اند موفق است.
- [ ] کد جدید طبق قراردادهای بالا نوشته شده و فایل بی‌استفاده یا کد کامنت‌شده باقی نمانده است.
- [ ] اگر مدل، مسیر API یا متغیر محیطی اضافه/تغییر کرده، `docs/` و `.env.example` به‌روز شده‌اند.
- [ ] هیچ رمز یا فایل `.env` در تغییرات نیست.
- [ ] توضیح Pull Request می‌گوید چه چیزی و چرا عوض شده است.
