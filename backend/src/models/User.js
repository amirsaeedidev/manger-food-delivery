/**
 * User model
 * کاربران (مدیر، کارمند، مشتری)
 *
 * Application users (manager, employee, customer).
 * TODO: define the schema fields.
 *
 * Mongoose 9 note: `pre` hooks no longer receive `next()`. Write them as async functions:
 *   schema.pre('save', async function () { ... });
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // TODO: add fields
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', schema);
