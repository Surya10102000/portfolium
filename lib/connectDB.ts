import mongoose from 'mongoose';

// Define a type for the cached connection
type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection;
}

// Test mode - set to true to skip database connection
const TEST_MODE = true;

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (TEST_MODE) {
    console.log('Running in test mode - database connection skipped');
    return null;
  }

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error('Please define the DATABASE_URL environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
export default dbConnect;