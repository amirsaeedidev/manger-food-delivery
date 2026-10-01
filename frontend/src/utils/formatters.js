/**
 * Formatting helpers (numbers, currency, percent).
 * Everything is shown with Persian digits and separators, e.g. ۲۱۹٬۹۰۰ or ۴٫۹.
 */
const numberFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 });

export const CURRENCY_LABEL = 'تومان';

// 1234.5 -> ۱٬۲۳۴٫۵
export const formatNumber = (value) => numberFormatter.format(Number(value) || 0);

// Prices are whole numbers: 219900 -> ۲۱۹٬۹۰۰
export const formatPrice = (value) => formatNumber(Math.round(Number(value) || 0));

// 219900 -> ۲۱۹٬۹۰۰ تومان
export const formatCurrency = (value) => `${formatPrice(value)} ${CURRENCY_LABEL}`;

// 30 -> ۳۰٪
export const formatPercent = (value) => `${formatNumber(value)}٪`;

// Replaces the Latin digits inside any text with Persian digits.
export const toPersianDigits = (text) => String(text).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]);
