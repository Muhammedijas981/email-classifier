import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function HomePage() {
  const session = await auth();

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If not logged in, show landing page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Logo/Icon */}
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Email Classifier
          </h1>
          <p className="text-gray-600 mb-8">
            Automatically classify your Gmail emails using AI-powered
            categorization
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Gmail Integration
                </p>
                <p className="text-xs text-gray-600">
                  Fetch your emails securely via Google OAuth
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  AI Classification
                </p>
                <p className="text-xs text-gray-600">
                  Powered by OpenAI GPT-4o via Langchain
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Smart Categories
                </p>
                <p className="text-xs text-gray-600">
                  Important, Promotional, Social, Marketing, Spam, General
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/login" className="block">
            <Button className="w-full py-3 text-base">Get Started →</Button>
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            Your data stays private and secure
          </p>
        </div>
      </div>
    </div>
  );
}
