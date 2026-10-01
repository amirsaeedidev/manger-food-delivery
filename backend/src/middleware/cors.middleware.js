/**
 * CORS middleware
 *
 * Allows the browser origins listed in CLIENT_URL (see config/env.js).
 * In development and in Docker the frontend normally calls the API through a proxy
 * (same origin), so CORS only matters when the frontend is served from another origin.
 */
const cors = require('cors');
const env = require('../config/env');

module.exports = cors({
  origin: env.clientUrls,
  credentials: true,
});
