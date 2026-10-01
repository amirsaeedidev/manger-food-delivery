# بک‌اند — API سیستم مدیریت رستوران

Express 5 + MongoDB (Mongoose 9) + Socket.io

> 🚧 **اسکلت:** سرور، اتصال دیتابیس، Socket.io و مدیریت خطا کار می‌کنند. مدل‌ها، routerها، controllerها و serviceها فایل‌هایی با ساختار درست ولی خالی هستند. فقط `GET /api/health` وجود دارد.

## اجرا

پیش‌نیاز: Node.js **۲۰.۱۹ یا بالاتر** و یک MongoDB در دسترس (راه‌اندازی MongoDB در [../docs/SETUP.md](../docs/SETUP.md)).

```bash
cp .env.example .env     # سپس مقادیر را بررسی کنید
npm install
npm run dev              # با nodemon (ری‌استارت خودکار)
```

بعد از اجرا:

```bash
curl http://localhost:5000/api/health
```

| دستور | کار |
| --- | --- |
| `npm run dev` | اجرا با nodemon برای توسعه |
| `npm start` | اجرای ساده (`node server.js`) |

متغیرهای محیطی در [../docs/SETUP.md](../docs/SETUP.md) توضیح داده شده‌اند. در حالت `NODE_ENV=production` مقدارهای `MONGODB_URI` و `JWT_SECRET` الزامی‌اند.

## ساختار

```text
backend/
├── server.js                 # اتصال DB، سرور HTTP، Socket.io، خاموشی تمیز
└── src/
    ├── app.js                # برنامه‌ی Express: middleware، routes، خطایاب
    ├── config/
    │   ├── env.js            # تنها محل خواندن process.env
    │   ├── database.js       # اتصال MongoDB
    │   └── constants.js      # API_PREFIX، ROLES
    ├── models/               # Schemaهای Mongoose (۱۳ مدل، فعلاً خالی)
    ├── routes/               # index.js + یک router برای هر ماژول
    ├── controllers/          # لاجیک هر ماژول
    ├── services/             # sms، payment، email، print، report
    ├── middleware/           # cors، logger، errorHandler، auth، validation
    ├── utils/                # constants، formatters، helpers، jwt.utils، validators
    └── socket/               # order، table، notification
```

معماری و جریان یک درخواست در [../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)، فهرست مسیرها در [../docs/API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md) و مدل‌ها در [../docs/DATABASE_SCHEMA.md](../docs/DATABASE_SCHEMA.md) آمده است.

## افزودن یک ماژول (مثال: سفارش‌ها)

۱. **مدل:** `src/models/Order.js` — فیلدها را به Schema اضافه کنید.

۲. **controller:** `src/controllers/orderController.js` — handlerها را بنویسید و export کنید:

```js
const Order = require('../models/Order');

const listOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
};

module.exports = { listOrders };
```

۳. **router:** `src/routes/orders.routes.js` — مسیرها را به controller وصل کنید (این router قبلاً در `routes/index.js` روی `/api/orders` سوار شده است):

```js
const express = require('express');
const { listOrders } = require('../controllers/orderController');

const router = express.Router();

router.get('/', listOrders);

module.exports = router;
```

۴. در صورت نیاز: service در `src/services/`، رویداد لحظه‌ای در `src/socket/`، و مستندات مسیر در `docs/API_DOCUMENTATION.md`.

در Express 5 خطای handlerهای `async` خودکار به `errorHandler` می‌رسد؛ برای خطای قابل‌پیش‌بینی خطایی با `statusCode` پرتاب کنید:

```js
const error = new Error('Order not found');
error.statusCode = 404;
throw error;
```

## نکات مهم

- **Mongoose 9:** hookهای `pre` پارامتر `next` ندارند و باید `async` باشند؛ به‌جای `new: true` از `returnDocument: 'after'` استفاده کنید.
- **`process.env`** را فقط در `config/env.js` بخوانید و در بقیه‌ی کد همان ماژول را import کنید.
- **`auth.middleware.js`** هنوز چیزی export نمی‌کند. وقتی پیاده شد، آن را روی routerهای محافظت‌شده بگذارید؛ تا آن زمان هیچ مسیری احراز هویت ندارد.
- **JWT_SECRET** در development اگر تنظیم نشده باشد، موقت و تصادفی ساخته می‌شود و با هر ری‌استارت توکن‌ها باطل می‌شوند.
- بسته‌های پیشنهادی برای مراحل بعد (هنوز نصب نشده‌اند): `jsonwebtoken` و `bcryptjs` برای احراز هویت، یک کتابخانه‌ی اعتبارسنجی ورودی، `nodemailer` برای ایمیل و `axios` یا SDK کاوه‌نگار برای پیامک.
