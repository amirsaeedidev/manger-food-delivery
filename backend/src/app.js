/**
 * Express application
 * فایل اصلی Express
 *
 * Builds and exports the Express app (middleware + routes + error handling).
 * It does NOT connect to the database or listen on a port — see ../server.js.
 */
const express = require('express');
const helmet = require('helmet');

const { API_PREFIX } = require('./config/constants');
const corsMiddleware = require('./middleware/cors.middleware');
const requestLogger = require('./middleware/logger.middleware');
const { notFound, errorHandler } = require('./middleware/errorHandler.middleware');
const routes = require('./routes');

const app = express();

// Security headers, CORS, request logging, body parsing
app.use(helmet());
app.use(corsMiddleware);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (all routers are combined in routes/index.js)
app.use(API_PREFIX, routes);

// 404 + centralized error handling (must stay last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
