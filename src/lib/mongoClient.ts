// MongoDB client setup for connecting to MongoDB Atlas
import { MongoClient } from 'mongodb';

// Get MongoDB URI from environment variables
const uri = process.env.MONGODB_URI || '';
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Throw error if URI is missing
if (!uri) throw new Error('Please add your MongoDB URI to .env.local');

// Use global variable to cache client connection
if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri);
  (global as any)._mongoClientPromise = client.connect();
}
clientPromise = (global as any)._mongoClientPromise;

// Export the client promise for use in API routes
export default clientPromise;
