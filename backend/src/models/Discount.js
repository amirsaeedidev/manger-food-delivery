/**
 * Discount model
 * تخفیف‌ها و کوپن‌ها
 *
 * Discounts and coupons.
 * TODO: define the schema fields.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // TODO: add fields
  },
  { timestamps: true }
);

module.exports = mongoose.model('Discount', schema);
