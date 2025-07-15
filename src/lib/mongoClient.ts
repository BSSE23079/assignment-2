// MongoDB client setup for connecting to MongoDB Atlas
import { MongoClient } from 'mongodb';

// Get MongoDB URI from environment variables
const uri = process.env.MONGODB_URI || '';

// Throw error if URI is missing
if (!uri) throw new Error('Please add your MongoDB URI to .env.local');

// Use global variable to cache client connection
interface GlobalWithMongoClientPromise {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalWithMongo = globalThis as unknown as GlobalWithMongoClientPromise;

let client: MongoClient;
if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}
const clientPromise = globalWithMongo._mongoClientPromise;

// Export the client promise for use in API routes
export default clientPromise;