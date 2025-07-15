// API route to save full blog text to MongoDB
import clientPromise from '@/lib/mongoClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Parse request body
  const { url, fullText } = await req.json();
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('blogSummariser');
    const collection = db.collection('fulltexts');
    // Insert document into collection
    const result = await collection.insertOne({ url, fullText });
    // Return inserted document ID
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
