import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not defined");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

let cached: MongooseCache = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // ← YEH LINE DNS FIX KARTI HAI - IPv4 force karta hai
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;