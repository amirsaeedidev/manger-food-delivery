/**
 * Request logger middleware
 *
 * Colored, concise logs in development; standard Apache "combined" format in production.
 */
const morgan = require('morgan');
const env = require('../config/env');

module.exports = morgan(env.isProduction ? 'combined' : 'dev');
