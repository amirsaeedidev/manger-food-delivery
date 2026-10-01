# مستندات API

> 🚧 **وضعیت:** فقط `GET /api/health` پیاده‌سازی شده است. routerهای ماژول‌ها سوار شده‌اند ولی هنوز مسیری ندارند؛ بخش «مسیرهای پیشنهادی» طراحی هدف است و پیاده‌سازی نشده. با پیشرفت توسعه، همین فایل را به‌روز کنید.

## اطلاعات پایه

| مورد | مقدار |
| --- | --- |
| آدرس پایه (توسعه) | `http://localhost:5000/api` |
| همان آدرس از طریق فرانت‌اند | `http://localhost:3000/api` (proxy) |
| قالب داده | JSON (`Content-Type: application/json`)؛ فرم‌های `urlencoded` هم پذیرفته می‌شوند |
| پیشوند | `/api` (ثابت `API_PREFIX` در `backend/src/config/constants.js`) |
| احراز هویت | برنامه‌ریزی‌شده: `Authorization: Bearer <token>` |

## قالب پاسخ‌ها

همه‌ی پاسخ‌ها JSON هستند و فیلد `success` دارند.

### خطا (پیاده‌سازی‌شده)

```json
{
  "success": false,
  "message": "Not found: GET /api/nope",
  "stack": "Error: Not found: GET /api/nope\n    at notFound (...)"
}
```

| وضعیت | زمان |
| --- | --- |
| `404` | مسیر یا متد وجود ندارد (پیام: `Not found: <METHOD> <URL>`) |
| `400` | بدنه‌ی JSON نامعتبر است |
| `5xx` | خطای پیش‌بینی‌نشده‌ی سرور |

- فیلد `stack` فقط در حالت غیر production وجود دارد.
- در production پیام خطاهای ۵xx همیشه `Internal server error` است و جزئیات فقط در لاگ سرور ثبت می‌شود.

### موفقیت (قرارداد پیشنهادی برای مسیرهای آینده)

```json
{ "success": true, "data": { } }
```

برای فهرست‌ها: `data` آرایه است و در صورت صفحه‌بندی فیلد `pagination` (`page`، `limit`، `total`) اضافه می‌شود.

## مسیرهای پیاده‌سازی‌شده

### `GET /api/health`

بررسی سلامت سرور (بدون احراز هویت). برای healthcheck داکر و مانیتورینگ هم استفاده می‌شود.

```bash
curl http://localhost:5000/api/health
```

```json
{
  "success": true,
  "status": "ok",
  "uptime": 12.345,
  "timestamp": "2026-01-01T10:00:00.000Z"
}
```

| فیلد | توضیح |
| --- | --- |
| `uptime` | مدت اجرای فرایند، به ثانیه |
| `timestamp` | زمان پاسخ، به‌صورت ISO 8601 (UTC) |

## ماژول‌ها

هر ماژول یک router جدا دارد که در `backend/src/routes/index.js` زیر `/api` سوار شده است.

| پیشوند | فایل router | controller | وضعیت |
| --- | --- | --- | --- |
| `/api/auth` | `auth.routes.js` | `authController.js` | بدون مسیر |
| `/api/orders` | `orders.routes.js` | `orderController.js` | بدون مسیر |
| `/api/tables` | `tables.routes.js` | `tableController.js` | بدون مسیر |
| `/api/menu` | `menu.routes.js` | `menuController.js` | بدون مسیر |
| `/api/customers` | `customers.routes.js` | `customerController.js` | بدون مسیر |
| `/api/inventory` | `inventory.routes.js` | `inventoryController.js` | بدون مسیر |
| `/api/discounts` | `discounts.routes.js` | `discountController.js` | بدون مسیر |
| `/api/reservations` | `reservations.routes.js` | `reservationController.js` | بدون مسیر |
| `/api/loyalty` | `loyalty.routes.js` | `loyaltyController.js` | بدون مسیر |
| `/api/payments` | `payments.routes.js` | `paymentController.js` | بدون مسیر |
| `/api/sms` | `sms.routes.js` | `smsController.js` | بدون مسیر |
| `/api/reports` | `reports.routes.js` | `reportController.js` | بدون مسیر |
| `/api/employees` | `employees.routes.js` | `employeeController.js` | بدون مسیر |
| `/api/dashboard` | `dashboard.routes.js` | `dashboardController.js` | بدون مسیر |

تا زمانی که مسیری تعریف نشده، درخواست به این پیشوندها پاسخ `404` استاندارد می‌گیرد.

## مسیرهای پیشنهادی (طراحی؛ پیاده‌سازی نشده)

> این جدول فقط پیشنهاد اولیه برای شروع کار است و هنگام پیاده‌سازی می‌تواند تغییر کند. نقش‌ها: `manager` (مدیر)، `employee` (کارمند)، `customer` (مشتری).

| ماژول | مسیرها |
| --- | --- |
| auth | `POST /auth/register`، `POST /auth/login`، `POST /auth/forgot-password`، `POST /auth/reset-password`، `GET /auth/me` |
| orders | `GET /orders`، `POST /orders`، `GET /orders/:id`، `PATCH /orders/:id/status`، `DELETE /orders/:id` |
| tables | `GET /tables`، `POST /tables`، `PATCH /tables/:id`، `PATCH /tables/:id/status` |
| menu | `GET/POST /menu/items`، `GET/PUT/DELETE /menu/items/:id`، `GET/POST /menu/categories`، `PUT/DELETE /menu/categories/:id` |
| customers | `GET/POST /customers`، `GET/PUT/DELETE /customers/:id`، `GET /customers/:id/orders` |
| inventory | `GET/POST /inventory`، `PUT /inventory/:id`، `PATCH /inventory/:id/stock`، `GET /inventory/low-stock` |
| discounts | `GET/POST /discounts`، `PUT/DELETE /discounts/:id`، `POST /discounts/validate` |
| reservations | `GET/POST /reservations`، `GET/PUT/DELETE /reservations/:id`، `PATCH /reservations/:id/status` |
| loyalty | `GET /loyalty/:customerId`، `POST /loyalty/:customerId/redeem` |
| payments | `POST /payments/request`، `GET /payments/verify`، `GET /payments/:id` |
| sms | `POST /sms/send`، `POST /sms/bulk`، `GET /sms` |
| reports | `GET /reports/sales`، `GET /reports/inventory`، `GET /reports/customers`، `GET /reports/employees` |
| employees | `GET/POST /employees`، `GET/PUT/DELETE /employees/:id` |
| dashboard | `GET /dashboard/summary` |

## Socket.io

آدرس: همان سرور بک‌اند (`http://localhost:5000`). در فرانت‌اند، `utils/socket.js` از `REACT_APP_SOCKET_URL` یا (اگر خالی باشد) از origin صفحه استفاده می‌کند.

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', { withCredentials: true });
socket.on('connect', () => console.log('connected', socket.id));
```

- فقط origin(های) فهرست‌شده در `CLIENT_URL` مجازند.
- برای هر اتصال، `registerOrderSocket`، `registerTableSocket` و `registerNotificationSocket` (پوشه‌ی `backend/src/socket/`) صدا زده می‌شود.
- **هنوز رویدادی تعریف نشده است.** قرارداد پیشنهادی نام‌گذاری: `<ماژول>:<رویداد>`، مانند `order:created`، `order:status-changed`، `table:status-changed`، `notification:new`.
- ارسال رویداد از داخل controller:

```js
req.app.get('io').emit('order:created', order);
```
