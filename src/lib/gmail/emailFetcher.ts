import { getGmailClient } from "./client";
import { parseGmailMessage } from "./emailParser";
import { Email } from "@/types/email";

export async function fetchEmails(
  accessToken: string,
  maxResults: number = 15
): Promise<Email[]> {
  try {
    const gmail = getGmailClient(accessToken);

    // Fetch message list
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults,
    });

    const messages = response.data.messages || [];

    // Fetch full message details
    const emailPromises = messages.map(async (msg) => {
      if (!msg.id) return null;

      const fullMessage = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
        format: "full",
      });

      return parseGmailMessage(fullMessage.data);
    });

    const emails = await Promise.all(emailPromises);
    return emails.filter((email): email is Email => email !== null);
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw new Error("Failed to fetch emails from Gmail");
  }
}
