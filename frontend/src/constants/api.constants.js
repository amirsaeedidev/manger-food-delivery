/**
 * API constants
 *
 * REACT_APP_API_URL defaults to the relative path "/api":
 *  - in development the CRA dev server proxies it to the backend (see src/setupProxy.js)
 *  - in Docker nginx proxies it to the backend container
 * Set an absolute URL (e.g. http://localhost:5000/api) only when there is no proxy.
 */
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Socket.io server. Defaults to the page origin (proxied the same way as the API).
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || window.location.origin;
