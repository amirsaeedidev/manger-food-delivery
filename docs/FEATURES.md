# قابلیت‌ها و وضعیت پیاده‌سازی

راهنمای علامت‌ها: ✅ انجام‌شده و کارکرد آن بررسی شده | 🟡 اسکلت (فایل‌ها هست ولی خالی است) | ⬜ برنامه‌ریزی‌شده

> پروژه در مرحله‌ی **اسکلت** است: زیرساخت کار می‌کند، اما منطق همه‌ی ماژول‌های کسب‌وکار هنوز نوشته نشده است. این فایل را با پیشرفت کار به‌روز نگه دارید.

## زیرساخت

| قابلیت | وضعیت | توضیح |
| --- | :---: | --- |
| ساختار پوشه‌ها و فایل‌ها طبق معماری پروژه | ✅ | |
| سرور Express با helmet، CORS، logger و body parser | ✅ | |
| ۴۰۴ و خطاها به‌صورت JSON با یک خطایاب مرکزی | ✅ | در production جزئیات خطای ۵xx پنهان می‌شود |
| `GET /api/health` | ✅ | |
| اتصال MongoDB، خواندن `.env` و اعتبارسنجی تنظیمات در production | ✅ | |
| Socket.io روی سرور | ✅ | ماژول‌های order / table / notification برای هر اتصال ثبت می‌شوند؛ هنوز رویدادی ندارند |
| خاموشی تمیز سرور (`SIGINT` و `SIGTERM`) | ✅ | |
| پوسته‌ی فرانت‌اند: Layout، سایدبار فارسی، مسیرها، صفحه‌ی ۴۰۴ | ✅ | |
| Tailwind با راست‌به‌چپ و توکن‌های طراحی | ✅ | |
| نمونه‌ی Axios و Socket.io در فرانت‌اند | ✅ | بدون interceptor و بدون اتصال خودکار |
| proxy توسعه برای `/api` و `/socket.io` | ✅ | `frontend/src/setupProxy.js` |
| Dockerfileها و `docker-compose.yml` | 🟡 | نوشته شده‌اند ولی هنوز روی Docker واقعی اجرا و تست نشده‌اند |

## ماژول‌ها

| ماژول | بک‌اند | فرانت‌اند | وضعیت |
| --- | --- | --- | :---: |
| احراز هویت و نقش‌ها | `User`، `authController`، `auth.middleware`، `jwt.utils` | `Auth/*`، `authStore`، `useAuth` | 🟡 |
| سفارش‌ها | `Order`، `orderController`، `orderSocket` | `Order/*`، `OrdersPage`، `orderStore` | 🟡 |
| میزها | `Table`، `tableController`، `tableSocket` | `Table/*`، `TablesPage`، `tableStore` | 🟡 |
| منو | `MenuItem`، `Category`، `menuController` | `Menu/*`، `MenuPage`، `menuStore` | 🟡 |
| مشتریان و باشگاه مشتریان | `Customer`، `LoyaltyProgram`، `customerController`، `loyaltyController` | `Customer/*`، `CustomersPage`، `customerStore` | 🟡 |
| انبار | `Inventory`، `inventoryController` | `Inventory/*`، `InventoryPage` | 🟡 |
| تخفیف‌ها و کوپن‌ها | `Discount`، `discountController` | `Discount/*` | 🟡 |
| رزرو میز | `Reservation`، `reservationController` | `Reservation/*`، `ReservationsPage` | 🟡 |
| پیامک | `SMS`، `smsController`، `smsService` | `SMS/*` | 🟡 |
| پرداخت و فاکتور | `Payment`، `paymentController`، `paymentService`، `printService` | `Payment/*`، `utils/print.js` | 🟡 |
| داشبورد | `dashboardController` | `Dashboard/*`، `DashboardPage` | 🟡 |
| گزارش‌ها | `reportController`، `reportService` | `Reports/*`، `ReportsPage` | 🟡 |
| کارمندان و تنظیمات | `Employee`، `employeeController` | `Settings/*`، `SettingsPage` | 🟡 |
| اعلان‌ها | `notificationSocket`، `emailService` | `notificationStore`، `useNotification` | 🟡 |

## قابلیت‌های برنامه‌ریزی‌شده

### احراز هویت و نقش‌ها
- [ ] ثبت‌نام و ورود با JWT
- [ ] فراموشی و بازیابی رمز عبور
- [ ] نقش‌های مدیر، کارمند و مشتری و محدودکردن دسترسی بر اساس نقش (در API و در منوی فرانت‌اند)
- [ ] محافظت از مسیرهای فرانت‌اند با `ProtectedRoute`

### سفارش‌ها
- [ ] ثبت، ویرایش و لغو سفارش (در محل، بیرون‌بر، ارسال)
- [ ] تغییر وضعیت سفارش و نمایش لحظه‌ای با Socket.io
- [ ] صفحه‌ی نمایش آشپزخانه (`KitchenDisplay`)
- [ ] چاپ فیش

### میزها
- [ ] فهرست میزها و وضعیت هر میز (آزاد، اشغال، رزرو)
- [ ] اتصال سفارش به میز و به‌روزرسانی لحظه‌ای وضعیت

### منو
- [ ] دسته‌بندی‌ها و آیتم‌های منو با قیمت و وضعیت موجود/ناموجود
- [ ] جست‌وجو در منو و ویرایشگر منو برای مدیر

### مشتریان و باشگاه مشتریان
- [ ] پرونده‌ی مشتری و تاریخچه‌ی سفارش‌ها
- [ ] امتیاز، سطح‌ها و استفاده از امتیاز (`LoyaltyCard`)

### انبار
- [ ] ثبت موجودی و کسر مواد اولیه با هر سفارش
- [ ] هشدار کمبود موجودی (`StockAlert`) و گزارش انبار

### تخفیف‌ها
- [ ] کد تخفیف و کوپن (درصدی یا مبلغ ثابت) با بازه‌ی اعتبار و سقف استفاده
- [ ] اعمال تخفیف هنگام ثبت سفارش

### رزرو میز
- [ ] ثبت رزرو و تقویم رزروها
- [ ] جلوگیری از رزرو هم‌زمان یک میز

### پیامک
- [ ] ارسال تکی و گروهی با Kavenegar یا Smsir
- [ ] قالب پیام، زمان‌بندی ارسال و گزارش پیام‌های ارسال‌شده

### پرداخت
- [ ] پرداخت نقدی، کارتخوان و آنلاین با ZarinPal (حالت sandbox و production)
- [ ] صدور فاکتور (`Invoice`)

### داشبورد و گزارش‌ها
- [ ] خلاصه‌ی فروش و درآمد و پرفروش‌ترین آیتم‌ها (نمودار)
- [ ] گزارش‌های فروش، مشتریان، کارمندان و انبار

### کارمندان و تنظیمات
- [ ] مدیریت کارمندان
- [ ] تنظیمات رستوران و سیستم

### بهبودهای عمومی
- [ ] بارگذاری فونت Vazirmatn
- [ ] نمایش تاریخ شمسی و اعداد فارسی
- [ ] ارسال ایمیل (SMTP)
- [ ] آزمون‌های خودکار و CI
- [ ] مهاجرت فرانت‌اند از Create React App به Vite
