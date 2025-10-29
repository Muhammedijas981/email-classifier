# Email Classifier - AI-Powered Gmail Email Categorization

A full-stack web application that automatically classifies Gmail emails into categories (Important, Promotional, Social, Marketing, Spam, General) using OpenAI GPT-4o and Langchain.js.

**Assignment Submission for:** MagicSlides.app Full-Stack Engineer Intern Position  
---

## 🎥 Demo

Demo link

## ✨ Features

- ✅ **Google OAuth Authentication** - Secure login with Gmail API access
- ✅ **Email Fetching** - Retrieve last X emails from Gmail (default: 15)
- ✅ **AI Classification** - Categorize emails using OpenAI GPT-4o via Langchain.js
- ✅ **Local Storage** - Store emails and API keys in browser localStorage
- ✅ **Category Filtering** - Filter emails by category (Important, Promotional, Social, etc.)
- ✅ **Responsive Design** - Modern UI with Tailwind CSS
- ✅ **Real-time Stats** - Dashboard showing email counts by category

## 📁 Project Structure

This is a **monorepo** structure using Next.js App Router with a clear separation of concerns:

```
email-classifier/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx             # Landing page
│   │   ├── login/               # Login page
│   │   ├── dashboard/           # Dashboard page (protected)
│   │   └── api/                 # API routes
│   │       ├── auth/            # NextAuth.js endpoints
│   │       └── emails/          # Email fetching & classification
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── email/               # Email-specific components
│   │   ├── auth/                # Authentication components
│   │   └── dashboard/           # Dashboard components
│   ├── lib/                     # Core business logic
│   │   ├── auth/                # NextAuth configuration
│   │   ├── gmail/               # Gmail API integration
│   │   ├── langchain/           # AI classification logic
│   │   ├── openai/              # OpenAI prompts
│   │   ├── storage/             # localStorage utilities
│   │   └── utils/               # Helper functions
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   └── auth.ts                  # NextAuth.js configuration
├── public/                      # Static assets
├── .env.local                   # Environment variables (not committed)
├── package.json                 # Dependencies
├── tailwind.config.mjs          # Tailwind CSS configuration
└── next.config.ts               # Next.js configuration
             # Next.js configuration
```

### Why Monorepo?

- **Single codebase** - Frontend and backend in one repository
- **Shared types** - TypeScript types used across client and server
- **Easier deployment** - Deploy entire app as one unit on Vercel
- **Better DX** - No CORS issues, simpler development workflow
- **Code reusability** - Share utilities, types, and constants

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js **18+** and npm  
- **Google Cloud Console** account  
- **OpenAI API** account with credits  

---

### **1. Clone the Repository**

```bash
git clone https://github.com/Muhammedijas981/email-classifier.git
cd email-classifier
```

---

### **2. Install Dependencies**

```bash
npm install
```

---

### **3. Set Up Environment Variables**

Create a `.env.local` file in the root directory and add the following:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

### **4. Generate Required Secrets**

#### 📝 Generate `NEXTAUTH_SECRET`
Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the generated key and paste it as the value for `NEXTAUTH_SECRET` in your `.env.local` file.

---

### **5. Get Google OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)  
2. Create a new project or select an existing one  
3. **Enable Gmail API:**
   - Navigate to **APIs & Services → Library**
   - Search for **Gmail API**
   - Click **Enable**

4. **Create OAuth 2.0 Credentials:**
   - Go to **APIs & Services → Credentials**
   - Click **Create Credentials → OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URI:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click **Create**
   - Copy the **Client ID** and **Client Secret**

5. **Configure OAuth Consent Screen:**
   - Go to **APIs & Services → OAuth consent screen**
   - Choose **External**
   - Fill in app name: `Email Classifier`
   - Add your email as developer contact
   - Add scopes:
     ```
     userinfo.email
     userinfo.profile
     gmail.readonly
     ```
   - Add test users:
     ```
     theindianappguy@gmail.com
     your-email@example.com
     ```
   - Save and continue

> **Note:** The app will remain in “Testing” mode — this is required for Gmail API access.

---

### **6. Get OpenAI API Key**

1. Go to [OpenAI Platform](https://platform.openai.com/signup)  
2. Sign in or create an account  
3. Go to [API Keys](https://platform.openai.com/api-keys)  
4. Click **Create new secret key**  
5. Copy the key (starts with `sk-proj-...`)  

**💡 Important:**  
- The OpenAI API key is **not stored in `.env.local`**  
- You’ll **enter it directly in the app UI**, where it is securely stored in `localStorage`  

---

### **7. Run the Development Server**

```bash
npm run dev
```

Then open your browser and visit:  
👉 [http://localhost:3000](http://localhost:3000)

## ✅ You’re All Set!

## 📖 Usage Guide

### Step 1: Login with Google

1. Click "Get Started" on the landing page
2. Click "Continue with Google"
3. Select your Google account
4. Grant permissions to read Gmail (you'll see a warning - click "Continue" since you're the developer)

### Step 2: Add OpenAI API Key

1. After login, you'll be on the dashboard
2. Click "Set API Key" button
3. Paste your OpenAI API key (starts with `sk-`)
4. Click "Save API Key"
5. The key is stored securely in your browser's localStorage

### Step 3: Fetch Emails

1. Choose number of emails to fetch (default: 15, max: 50)
2. Click "Fetch Emails"
3. Wait 5-10 seconds for emails to load
4. Emails are displayed with sender, subject, date, and snippet

### Step 4: Classify Emails

1. Click "Classify with AI"
2. Wait 15-30 seconds (depends on email count)
3. Each email will show a colored category badge:
    - 🔴 **Important** - Personal/work emails needing attention
    - 🟡 **Promotional** - Sales, discounts, marketing campaigns
    - 🔵 **Social** - Social networks, friends, family
    - 🟢 **Marketing** - Newsletters, notifications
    - 🔴 **Spam** - Unwanted emails
    - ⚪ **General** - Everything else

### Step 5: Filter by Category

1. Click category buttons at the top to filter
2. Click "All" to show all emails
3. Stats dashboard shows count per category

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first CSS framework
- **Turbopack** - Fast bundler

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js v5** - Authentication
- **Google Gmail API** - Email fetching
- **Langchain.js** - AI orchestration framework
- **OpenAI GPT-4o** - Email classification

### Storage
- **localStorage** - Client-side storage for emails and API keys
- No database required (as per assignment)
---

## 🏗️ Architecture

### Authentication Flow
User → Login Page → Google OAuth → Gmail API Permission
→ NextAuth Session → Protected Dashboard



### Email Classification Flow
User clicks "Fetch Emails"
→ Frontend → /api/emails/fetch
→ Gmail API → Returns emails
→ Store in localStorage

User clicks "Classify with AI"
→ Frontend reads OpenAI key from localStorage
→ Frontend → /api/emails/classify (emails + API key)
→ Backend → Langchain + OpenAI API
→ OpenAI returns categories
→ Frontend updates UI with badges
---

## 🐛 Troubleshooting

### **Error: "Access blocked: Email Classifier has not completed verification"**
**Solution:**  
Add yourself as a test user in Google Cloud Console:
1. Go to **OAuth consent screen**
2. Scroll to **Test users**
3. Click **Add Users**
4. Add your email address

---

### **Error: "redirect_uri_mismatch"**
**Solution:**  
Add the correct redirect URI:
1. Go to **Google Cloud Console → Credentials**
2. Edit your **OAuth 2.0 Client ID**
3. Add this URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. Save and wait 1–2 minutes

---

### **Error: "429 You exceeded your current quota"**
**Solution:**  
Add credits to your OpenAI account:
1. Go to [OpenAI Billing Overview](https://platform.openai.com/settings/organization/billing/overview)
2. Click **Add to credit balance**
3. Add at least **$5–10**
4. Wait 2–3 minutes for activation

---

### **Error: "Failed to fetch emails"**
**Solution:**  
- Ensure **Gmail API** is enabled in Google Cloud Console  
- Verify OAuth scopes include:
  ```
  gmail.readonly
  ```
- Log out and log back in  
- Check terminal logs for additional errors  

---

### **Issue: All emails showing "General" category**
**Cause:** OpenAI API error (usually quota or invalid key).  
**Solution:**  
- Check terminal logs for the exact error  
- Verify your **OpenAI API key** is correct  
- Ensure you have sufficient **OpenAI credits**  
- Check browser console for related errors  

---


## 🔒 Security Considerations

- ✅ OAuth tokens never exposed to client
- ✅ API keys stored only in user's localStorage (BYOK model)
- ✅ No email data stored on server
- ✅ NextAuth.js handles session management
- ✅ Gmail API uses least-privilege access (readonly)
- ⚠️ Production deployment requires Google app verification

---

## 📄 License

This project is created as an assignment submission for MagicSlides.app.

