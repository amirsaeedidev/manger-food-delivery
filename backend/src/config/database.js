/**
 * MongoDB connection
 * اتصال MongoDB
 */
const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  const mongo = await mongoose.connect(env.mongoUri, {
    // Fail fast (instead of the default 30s) when MongoDB is not reachable.
    serverSelectionTimeoutMS: 10000,
  });

  const { host, port, name } = mongo.connection;
  console.log(`MongoDB connected: ${host}:${port}/${name}`);

  return mongo;
};

module.exports = connectDB;
