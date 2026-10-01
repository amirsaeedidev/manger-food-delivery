/**
 * Server entry point
 * نقطه شروع سرور
 *
 * Connects to MongoDB, creates the HTTP server, attaches Socket.io and starts listening.
 * The Express application itself lives in src/app.js.
 */
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const env = require('./src/config/env');
const connectDB = require('./src/config/database');
const app = require('./src/app');

const registerOrderSocket = require('./src/socket/orderSocket');
const registerTableSocket = require('./src/socket/tableSocket');
const registerNotificationSocket = require('./src/socket/notificationSocket');

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: env.clientUrls, credentials: true },
  });

  // Make Socket.io reachable from controllers: req.app.get('io').emit(...)
  app.set('io', io);

  io.on('connection', (socket) => {
    registerOrderSocket(io, socket);
    registerTableSocket(io, socket);
    registerNotificationSocket(io, socket);
  });

  server.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });

  // Graceful shutdown: stop accepting connections, then close MongoDB.
  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down...`);

    // Safety net in case some connection never closes.
    setTimeout(() => process.exit(1), 10000).unref();

    // io.close() also closes the underlying HTTP server.
    io.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

startServer().catch((error) => {
  console.error('Failed to start the server:', error.message);
  process.exit(1);
});
