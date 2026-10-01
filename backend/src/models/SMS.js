/**
 * SMS model
 * لیست پیام‌های ارسال‌شده
 *
 * Log of sent SMS messages.
 * TODO: define the schema fields.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // TODO: add fields
  },
  { timestamps: true }
);

module.exports = mongoose.model('SMS', schema);
