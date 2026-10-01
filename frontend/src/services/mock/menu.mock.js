/**
 * Mock menu data — used until the backend menu API exists (see services/menuService.js).
 *
 * Prices are in Toman. Each food `id` is also the slug of its picture in src/assets/foods/
 * (e.g. greek-salad.png), and each category `id` is the slug of its icon in src/assets/categories/.
 * The demo prices are the reference design prices × 10,000 (e.g. 21.99 → 219,900).
 */
export const categories = [
  { id: 'vegetarian', label: 'گیاهی', icon: 'leaf' },
  { id: 'cake', label: 'کیک', icon: 'cake' },
  { id: 'drink', label: 'نوشیدنی', icon: 'drink' },
  { id: 'other', label: 'سایر', icon: 'more' },
  { id: 'burger', label: 'برگر', icon: 'burger' },
  { id: 'pizza', label: 'پیتزا', icon: 'pizza' },
  { id: 'salad', label: 'سالاد', icon: 'salad' },
];

export const foods = [
  {
    id: 'greek-salad',
    name: 'سالاد یونانی',
    price: 219900,
    rating: 4.9,
    category: 'salad',
    weekly: true,
    description:
      'این سالاد ایتالیایی همه‌ی طعم‌ها و بافت‌های درست را یک‌جا دارد: کاهوی تازه و ترد، نان تُست سیر و فلفل پپرونچینی تند. روی آن سس ایتالیایی پرطعم و معطر ریخته می‌شود که مزه‌ها را زنده می‌کند! همراه تقریباً هر غذایی می‌نشیند.',
  },
  {
    id: 'prawn-salad',
    name: 'سالاد میگو',
    price: 59800,
    rating: 4.7,
    category: 'salad',
    weekly: true,
    description:
      'میگوی تازه‌ی سرخ‌شده روی تخت اسفناج و گوجه‌گیلاسی، با سس لیمو و سیر. سبک، سریع و سرشار از طعم دریا.',
  },
  {
    id: 'bbq-chicken',
    name: 'مرغ باربیکیو',
    price: 119800,
    rating: 4.8,
    category: 'other',
    weekly: true,
    description:
      'ران مرغ مزه‌دارشده که در سس باربیکیوی دودی کباب می‌شود تا بیرونش براق و داخلش آبدار بماند. با سیب‌زمینی و سالاد سرو می‌شود.',
  },
  {
    id: 'chicken-burger',
    name: 'برگر مرغ',
    price: 85000,
    rating: 4.6,
    category: 'burger',
    weekly: true,
    description:
      'فیله‌ی مرغ ترد، کاهو، گوجه و پنیر چدار ذوب‌شده لای نان کنجدی تازه؛ همراه سس مخصوص خانه.',
  },
  {
    id: 'margherita-pizza',
    name: 'پیتزا مارگاریتا',
    price: 139000,
    rating: 4.5,
    category: 'pizza',
    weekly: false,
    description: 'خمیر نازک و تردِ دست‌ورز با سس گوجه‌ی تازه، موزارلای کشدار و ریحان.',
  },
  {
    id: 'chocolate-cake',
    name: 'کیک شکلاتی',
    price: 69000,
    rating: 4.8,
    category: 'cake',
    weekly: false,
    description: 'کیک شکلاتی نمدار با ganache تلخ؛ مناسب عاشقان شکلات واقعی.',
  },
  {
    id: 'mint-lemonade',
    name: 'لیموناد نعنا',
    price: 39000,
    rating: 4.4,
    category: 'drink',
    weekly: false,
    description: 'لیموی تازه‌فشرده، نعنای محلی و یخ؛ خنک و خوش‌طعم.',
  },
  {
    id: 'veggie-bowl',
    name: 'بول سبزیجات',
    price: 99000,
    rating: 4.3,
    category: 'vegetarian',
    weekly: false,
    description: 'برنج قهوه‌ای، نخود، آووکادو و سبزیجات فصل با سس تاهینی.',
  },
];

export const offers = [
  {
    id: 'chicken-burger',
    foodId: 'chicken-burger',
    percent: 30,
    headline: 'تخفیف روی',
    title: 'برگر مرغ',
  },
];
