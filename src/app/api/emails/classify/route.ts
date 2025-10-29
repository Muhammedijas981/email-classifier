import { NextResponse } from "next/server";
import { classifyEmails } from "@/lib/langchain/classifier";

export async function POST(request: Request) {
  try {
    const { emails, apiKey } = await request.json();

    if (!emails || !apiKey) {
      return NextResponse.json(
        { error: "Missing emails or API key" },
        { status: 400 }
      );
    }

    const classifiedEmails = await classifyEmails(emails, apiKey);

    return NextResponse.json({ emails: classifiedEmails });
  } catch (error) {
    console.error("Error in classify emails API:", error);
    return NextResponse.json(
      { error: "Failed to classify emails" },
      { status: 500 }
    );
  }
}
