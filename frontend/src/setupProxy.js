// Development-only proxy. Create React App loads this file automatically when `npm start` runs;
// it is never part of the production bundle (nginx does the same job in Docker, see docker/Dockerfile.frontend).
//
// Forwards /api and /socket.io (including WebSocket upgrades) to the backend, so the browser only
// ever talks to the dev server's own origin and no CORS setup is needed while developing.
//
// This is used instead of the "proxy" field in package.json because that field:
//   - makes `npm start` crash with "allowedHosts[0] should be a non-empty string" on machines
//     without a LAN IP (offline, containers, WSL, ...),
//   - turns on the dev-server host check, which breaks remote previews (Codespaces, Gitpod, ...),
//   - does not forward WebSocket upgrades reliably.
const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

module.exports = function setupProxy(app) {
  app.use(
    createProxyMiddleware(['/api', '/socket.io'], {
      target,
      changeOrigin: true,
      ws: true,
      logLevel: 'warn',
    })
  );
};
