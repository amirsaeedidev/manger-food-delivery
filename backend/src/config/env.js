/**
 * Environment configuration
 * متغیرهای محیطی
 *
 * The only place that reads `process.env`. Import this module instead of
 * touching `process.env` directly anywhere else in the code base.
 */
const crypto = require('crypto');
const path = require('path');
const dotenv = require('dotenv');

// Load backend/.env no matter where the process was started from.
// Real environment variables (Docker, CI, hosting panel) always win over the file.
dotenv.config({ path: path.resolve(__dirname, '../../.env'), quiet: true });

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

if (isProduction) {
  const missing = ['MONGODB_URI', 'JWT_SECRET'].filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  if (/^change-me/i.test(process.env.JWT_SECRET)) {
    throw new Error('JWT_SECRET still has the example value from .env.example. Set a long random secret.');
  }
}

let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  // Never fall back to a hard-coded secret. A random one is safe, but tokens
  // stop being valid whenever the server restarts.
  jwtSecret = crypto.randomBytes(32).toString('hex');
  console.warn('JWT_SECRET is not set: using a temporary random secret (tokens are invalidated on restart).');
}

const toList = (value, fallback) =>
  (value || fallback)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

module.exports = {
  nodeEnv,
  isProduction,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurant-management',

  // Browser origins allowed by CORS and Socket.io (comma separated in CLIENT_URL).
  clientUrls: toList(process.env.CLIENT_URL, 'http://localhost:3000'),

  jwt: {
    secret: jwtSecret,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // SMS provider: Kavenegar or Smsir
  sms: {
    provider: process.env.SMS_PROVIDER || 'kavenegar',
    kavenegarApiKey: process.env.KAVENEGAR_API_KEY || '',
    kavenegarSender: process.env.KAVENEGAR_SENDER || '',
    smsirApiKey: process.env.SMSIR_API_KEY || '',
    smsirLineNumber: process.env.SMSIR_LINE_NUMBER || '',
  },

  // Payment gateway: ZarinPal
  zarinpal: {
    merchantId: process.env.ZARINPAL_MERCHANT_ID || '',
    callbackUrl: process.env.ZARINPAL_CALLBACK_URL || '',
    sandbox: process.env.ZARINPAL_SANDBOX !== 'false',
  },

  // Email (SMTP)
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.EMAIL_FROM || '',
  },
};
