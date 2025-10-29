import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { Email, EmailCategory } from "@/types/email";
import { EMAIL_CLASSIFICATION_PROMPT } from "../openai/prompts";

export async function classifyEmail(
  email: Email,
  apiKey: string
): Promise<EmailCategory> {
  try {

    if (!apiKey || apiKey.trim() === "") {
      console.error("API key is empty or undefined!");
      return "General";
    }

    // Try different parameter names for the API key
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      apiKey: apiKey, 
      temperature: 0,
      configuration: {
        apiKey: apiKey, 
      },
    });

    const prompt = PromptTemplate.fromTemplate(EMAIL_CLASSIFICATION_PROMPT);

    const formattedPrompt = await prompt.format({
      subject: email.subject || "(No subject)",
      from: email.from || "Unknown",
      body: email.body || email.snippet || "(No content)",
    });

    const response = await model.invoke(formattedPrompt);
    const category = response.content.toString().trim();


    // Validate category
    const validCategories: EmailCategory[] = [
      "Important",
      "Promotional",
      "Social",
      "Marketing",
      "Spam",
      "General",
    ];

    if (validCategories.includes(category as EmailCategory)) {
      return category as EmailCategory;
    }
    return "General";
  } catch (error) {
    console.error("Error classifying email:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return "General";
  }
}

export async function classifyEmails(
  emails: Email[],
  apiKey: string
): Promise<Email[]> {

  if (!apiKey || apiKey.trim() === "") {
    console.error(" No API key provided to classifyEmails!");
    // Return emails with General category
    return emails.map((email) => ({
      ...email,
      category: "General" as EmailCategory,
    }));
  }

  const classifiedEmails = await Promise.all(
    emails.map(async (email) => {
      const category = await classifyEmail(email, apiKey);
      return { ...email, category };
    })
  );
  return classifiedEmails;
}
