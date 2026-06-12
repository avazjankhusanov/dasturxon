import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

declare global {
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = globalThis._mongooseCache

if (!cached) {
  cached = globalThis._mongooseCache = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}
