"use client";
// This is the main client page for the Blog Summariser app
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Home component renders the main UI and handles logic
export default function Home() {
  // State for blog URL input
  const [url, setUrl] = useState("");
  // State for summary output
  const [summary, setSummary] = useState("");
  // State for Urdu translation
  const [urduSummary, setUrduSummary] = useState("");
  // State for full blog text
  const [fullText, setFullText] = useState("");
  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // Simulate scraping and summary
  // Handles form submission and main logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Show loading indicator
    // Simulate scraping blog text from URL
    const scrapedText = `Simulated scraped text from: ${url}`;
    setFullText(scrapedText); // Store scraped text
    // Simulate summary generation
    const simSummary = `Summary of blog at ${url}`;
    setSummary(simSummary); // Store summary
    // Improved Urdu translation logic
    const urduDict: Record<string, string> = {
      Summary: "خلاصہ",
      of: "کا",
      blog: "بلاگ",
      at: "پر",
      the: "یہ",
      from: "سے",
    };
    // Replace words and also handle punctuation
    const urdu = simSummary
      .replace(/([.,!?:;])/g, " $1") // Separate punctuation
      .split(/\s+/) // Split into words
      .map((word) => urduDict[word.toLowerCase()] || word) // Translate if possible
      .join(" ") // Join back to string
      .replace(/ ([.,!?:;])/g, "$1"); // Remove extra space before punctuation
    setUrduSummary(urdu); // Store Urdu summary

    // Save summary to Supabase via API
    await fetch("/api/save-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, summary: simSummary, urduSummary: urdu }),
    });

    // Save full blog text to MongoDB via API
    await fetch("/api/save-fulltext", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, fullText: scrapedText }),
    });

    setLoading(false); // Hide loading indicator
  };

  // Render the UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* App title */}
      <h1 className="text-2xl font-bold mb-6">Blog Summariser</h1>
      {/* Input form for blog URL */}
      <Card className="w-full max-w-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Blog URL input */}
          <Input
            type="url"
            placeholder="Enter blog URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          {/* Submit button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Summarise"}
          </Button>
        </form>
      </Card>
      {/* Display summary and translations if available */}
      {summary && (
        <Card className="w-full max-w-md p-6 mt-4">
          <div className="mb-4">
            {/* English summary */}
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <p>{summary}</p>
          </div>
          <div className="mb-4">
            {/* Urdu translation */}
            <h2 className="text-lg font-semibold mb-2">Urdu Translation</h2>
            <p>{urduSummary}</p>
          </div>
          <div>
            {/* Simulated full blog text */}
            <h2 className="text-lg font-semibold mb-2">
              Full Blog Text (Simulated)
            </h2>
            <p>{fullText}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
