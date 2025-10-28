export const EMAIL_CLASSIFICATION_PROMPT = `You are an email classifier. Analyze the following email and classify it into ONE of these categories:

Categories:
- Important: Personal or work-related emails requiring immediate attention
- Promotional: Sales, discounts, and marketing campaigns
- Social: Social networks, friends, and family
- Marketing: Marketing newsletters and notifications
- Spam: Unwanted or unsolicited emails
- General: Everything else that doesn't fit the above categories

Email Details:
Subject: {subject}
From: {from}
Body: {body}

Respond with ONLY the category name, nothing else.`;
