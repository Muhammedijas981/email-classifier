import { gmail_v1 } from "googleapis";
import { Email } from "@/types/email";

export function parseGmailMessage(
  message: gmail_v1.Schema$Message
): Email | null {
  if (!message.id || !message.payload) return null;

  const headers = message.payload.headers || [];
  const getHeader = (name: string) =>
    headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ||
    "";

  // Get email body
  let body = "";
  if (message.payload.parts) {
    const textPart = message.payload.parts.find(
      (part) => part.mimeType === "text/plain"
    );
    if (textPart?.body?.data) {
      body = Buffer.from(textPart.body.data, "base64").toString("utf-8");
    }
  } else if (message.payload.body?.data) {
    body = Buffer.from(message.payload.body.data, "base64").toString("utf-8");
  }

  return {
    id: message.id,
    threadId: message.threadId || "",
    subject: getHeader("Subject"),
    from: getHeader("From"),
    date: getHeader("Date"),
    snippet: message.snippet || "",
    body: body.substring(0, 500), // Limit body length
    labels: message.labelIds || [],
  };
}
