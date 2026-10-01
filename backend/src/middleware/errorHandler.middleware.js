/**
 * Error handling middleware
 *
 * - notFound:     turns any unmatched request into a 404 error
 * - errorHandler: sends every error as JSON: { success: false, message }
 *
 * Both must be registered after all routes (see src/app.js).
 */
const env = require('../config/env');

const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Express recognises error handlers by their 4 arguments — keep `next` in the signature.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  // Do not leak internal details of unexpected (5xx) errors in production.
  const message = statusCode >= 500 && env.isProduction ? 'Internal server error' : err.message;

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.isProduction ? {} : { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
