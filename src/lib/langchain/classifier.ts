import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { Email, EmailCategory } from "@/types/email";
import { EMAIL_CLASSIFICATION_PROMPT } from "../openai/prompts";

export async function classifyEmail(
  email: Email,
  apiKey: string
): Promise<EmailCategory> {
  try {
    const model = new ChatOpenAI({
      modelName: "gpt-4o",
      openAIApiKey: apiKey,
      temperature: 0,
    });

    const prompt = PromptTemplate.fromTemplate(EMAIL_CLASSIFICATION_PROMPT);

    const formattedPrompt = await prompt.format({
      subject: email.subject,
      from: email.from,
      body: email.body || email.snippet,
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

    return "General"; // Default fallback
  } catch (error) {
    console.error("Error classifying email:", error);
    return "General";
  }
}

export async function classifyEmails(
  emails: Email[],
  apiKey: string
): Promise<Email[]> {
  const classifiedEmails = await Promise.all(
    emails.map(async (email) => {
      const category = await classifyEmail(email, apiKey);
      return { ...email, category };
    })
  );

  return classifiedEmails;
}
