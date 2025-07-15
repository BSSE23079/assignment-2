// API route to save summary and Urdu translation to Supabase
import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Parse request body
  const { url, summary, urduSummary } = await req.json();
  // Insert data into Supabase 'summaries' table
  const { data, error } = await supabase.from('summaries').insert([
    { url, summary, urdu_summary: urduSummary }
  ]);
  // Handle errors
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // Return inserted data
  return NextResponse.json({ data });
}
