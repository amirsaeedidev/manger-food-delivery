/**
 * Category model
 * دسته‌بندی منو
 *
 * Menu categories.
 * TODO: define the schema fields.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // TODO: add fields
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', schema);
