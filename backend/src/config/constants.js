/**
 * Global constants
 * ثابت‌های سراسری
 */

// Every API route is mounted under this prefix (see src/app.js).
const API_PREFIX = '/api';

// User roles: مدیر، کارمند، مشتری
const ROLES = Object.freeze({
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
});

// TODO: add the remaining shared constants (order statuses, table statuses, payment methods ...)
// when the related models are implemented.

module.exports = {
  API_PREFIX,
  ROLES,
};
