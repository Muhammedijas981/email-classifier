import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { fetchEmails } from "@/lib/gmail/emailFetcher";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const maxResults = parseInt(searchParams.get("count") || "15");

    const emails = await fetchEmails(session.accessToken, maxResults);

    return NextResponse.json({ emails, count: emails.length });
  } catch (error) {
    console.error("Error in fetch emails API:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
