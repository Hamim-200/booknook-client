import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

// In development, Next.js reloads files often.
// We keep one client on `global` so we don't open a new connection each time.
const globalForMongo = globalThis;

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(uri);
}

const client = globalForMongo._mongoClient;

export default client;