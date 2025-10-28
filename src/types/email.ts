export interface Email {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  body: string;
  category?: EmailCategory;
  labels?: string[];
}

export type EmailCategory =
  | "Important"
  | "Promotional"
  | "Social"
  | "Marketing"
  | "Spam"
  | "General";

export interface ClassificationResult {
  emailId: string;
  category: EmailCategory;
  confidence?: number;
}
