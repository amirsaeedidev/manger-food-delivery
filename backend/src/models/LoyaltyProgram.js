/**
 * LoyaltyProgram model
 * باشگاه مشتریان
 *
 * Customer loyalty club.
 * TODO: define the schema fields.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // TODO: add fields
  },
  { timestamps: true }
);

module.exports = mongoose.model('LoyaltyProgram', schema);
