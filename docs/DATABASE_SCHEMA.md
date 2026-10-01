# ساختار پایگاه داده

دیتابیس MongoDB است و مدل‌ها با Mongoose 9 تعریف می‌شوند (پوشه‌ی `backend/src/models/`). نام پایگاه داده‌ی پیش‌فرض: `restaurant-management`.

> 🚧 **وضعیت:** ۱۳ مدل ساخته شده‌اند ولی **هیچ فیلدی ندارند**؛ هر Schema فعلاً خالی و فقط با `timestamps: true` (فیلدهای `createdAt` و `updatedAt`) است. فیلدها و ارتباط‌های این سند **طراحی پیشنهادی** هستند و هنگام پیاده‌سازی هر مدل باید نهایی شوند.

## مدل‌ها

نام collection را Mongoose خودکار از نام مدل می‌سازد (حروف کوچک و جمع).

| مدل | فایل | collection | توضیح |
| --- | --- | --- | --- |
| `User` | `User.js` | `users` | کاربران (مدیر، کارمند، مشتری) |
| `Customer` | `Customer.js` | `customers` | مشتریان |
| `Employee` | `Employee.js` | `employees` | کارمندان |
| `Category` | `Category.js` | `categories` | دسته‌بندی منو |
| `MenuItem` | `MenuItem.js` | `menuitems` | آیتم‌های منو |
| `Table` | `Table.js` | `tables` | میزهای رستوران |
| `Order` | `Order.js` | `orders` | سفارش‌ها |
| `Reservation` | `Reservation.js` | `reservations` | رزرو میز |
| `Inventory` | `Inventory.js` | `inventories` | انبار و موجودی |
| `Discount` | `Discount.js` | `discounts` | تخفیف‌ها و کوپن‌ها |
| `LoyaltyProgram` | `LoyaltyProgram.js` | `loyaltyprograms` | باشگاه مشتریان |
| `Payment` | `Payment.js` | `payments` | پرداخت‌ها |
| `SMS` | `SMS.js` | `sms` | لیست پیام‌های ارسال‌شده |

## فیلدهای پیشنهادی

| مدل | فیلدهای اصلی |
| --- | --- |
| `User` | نام، شماره موبایل یا ایمیل (یکتا)، رمز عبور (فقط هش‌شده)، `role` (`manager` / `employee` / `customer`)، `isActive` |
| `Customer` | نام، شماره موبایل (یکتا)، ایمیل، تاریخ تولد، آدرس‌ها، یادداشت، ارجاع اختیاری به `User`، امتیاز باشگاه |
| `Employee` | ارجاع به `User`، سمت، تاریخ استخدام، شیفت، `isActive` |
| `Category` | نام، ترتیب نمایش، `isActive` |
| `MenuItem` | نام، توضیح، `category`، قیمت، تصویر، `isAvailable`، زمان آماده‌سازی، مواد اولیه (ارجاع به `Inventory` و مقدار مصرف) |
| `Table` | شماره، ظرفیت، بخش (سالن/فضای باز)، وضعیت (`free` / `occupied` / `reserved` / `cleaning`) |
| `Order` | شماره سفارش، نوع (`dine-in` / `takeaway` / `delivery`)، `table`، `customer`، آیتم‌ها (ارجاع به منو + نام، قیمت و تعداد در لحظه‌ی ثبت + توضیح)، وضعیت، جمع جزء، تخفیف، مبلغ نهایی، `createdBy` |
| `Reservation` | `customer`، `table`، تاریخ و ساعت، تعداد نفرات، وضعیت، یادداشت |
| `Inventory` | نام، واحد، موجودی، حداقل موجودی (آستانه‌ی هشدار)، قیمت واحد، تأمین‌کننده |
| `Discount` | کد، نوع (درصدی / مبلغ ثابت)، مقدار، حداقل سفارش، بازه‌ی اعتبار، سقف استفاده، تعداد استفاده، `isActive` |
| `LoyaltyProgram` | قوانین کسب امتیاز، سطح‌ها و قوانین استفاده از امتیاز |
| `Payment` | `order`، مبلغ، روش (نقدی / کارتخوان / آنلاین)، شناسه‌ی تراکنش درگاه، وضعیت، زمان پرداخت |
| `SMS` | گیرنده، متن، قالب، سرویس‌دهنده (`kavenegar` / `smsir`)، وضعیت، شناسه‌ی پیام در سرویس‌دهنده، `customer` |

## ارتباط‌ها

```text
User ──1:1── Employee
User ──1:0..1── Customer
Category ──1:N── MenuItem ──N:M── Inventory   (ingredients)
Customer ──1:N── Order ──N:M── MenuItem       (order lines)
Table ──1:N── Order
Order ──1:N── Payment
Customer ──1:N── Reservation ──N:1── Table
Discount ──1:N── Order                         (applied discount)
Customer ──1:N── SMS
Customer ──N:1── LoyaltyProgram                (tier and points)
```

## قراردادهای پیشنهادی

- **مبلغ‌ها:** به‌صورت عدد صحیح و در کوچک‌ترین واحد انتخاب‌شده (ریال یا تومان؛ یکی را انتخاب و در کل پروژه ثابت نگه دارید). از عدد اعشاری برای پول استفاده نکنید.
- **تاریخ‌ها:** در پایگاه داده به‌صورت UTC ذخیره شوند؛ تبدیل به تاریخ شمسی فقط هنگام نمایش در فرانت‌اند انجام شود.
- **قیمت در سفارش:** نام و قیمت آیتم در لحظه‌ی ثبت داخل سفارش کپی شود تا تغییر بعدی منو، سفارش‌های قدیمی و گزارش‌ها را تغییر ندهد.
- **حذف:** برای سندهایی که جای دیگر به آن‌ها ارجاع شده (آیتم منو، مشتری، میز) به‌جای حذف فیزیکی از `isActive` استفاده کنید.
- **index‌ها:** یکتا برای موبایل، ایمیل، کد تخفیف، شماره سفارش و شماره میز؛ index روی `Order.createdAt` و `Order.status`؛ index ترکیبی `Reservation.table + date`.
- **رمز عبور:** هرگز به‌صورت متن ساده ذخیره نشود (برنامه‌ریزی: `bcrypt`)، و فیلد رمز به‌صورت پیش‌فرض در خروجی JSON نیاید (`select: false`).

## نکات Mongoose 9

- در hookهای `pre` پارامتر `next` وجود ندارد؛ تابع را `async` بنویسید:

```js
schema.pre('save', async function () {
  // ...
});
```

- برای دریافت سند به‌روزشده از `returnDocument: 'after'` به‌جای `new: true` استفاده کنید (گزینه‌ی قدیمی هشدار می‌دهد).
- به‌روزرسانی با pipeline فقط با گزینه‌ی `updatePipeline: true` مجاز است.
- فایل `User.js` همین نکته را در کامنت بالای خود دارد.
