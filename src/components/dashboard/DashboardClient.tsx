"use client";

import { useState } from "react";
import { useEmails } from "@/hooks/useEmails";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage/localStorage";
import Button from "@/components/ui/Button";
import EmailList from "@/components/email/EmailList";
import ApiKeyModal from "@/components/auth/ApiKeyModal";

interface DashboardClientProps {
  session: any;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [apiKey, setApiKey] = useLocalStorage<string>(
    STORAGE_KEYS.OPENAI_API_KEY,
    ""
  );
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { emails, loading, error, fetchEmails, classifyEmails } = useEmails();
  const [emailCount, setEmailCount] = useState(15);

  const handleFetchEmails = async () => {
    try {
      await fetchEmails(emailCount);
    } catch (err) {
      console.error("Failed to fetch emails:", err);
    }
  };

  const handleClassifyEmails = async () => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    try {
      await classifyEmails(apiKey);
    } catch (err) {
      console.error("Failed to classify emails:", err);
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
  };

  const handleSignOut = async () => {
    window.location.href = "/api/auth/signout";
  };

  // Calculate stats
  const stats = {
    total: emails.length,
    important: emails.filter((e) => e.category === "Important").length,
    promotional: emails.filter((e) => e.category === "Promotional").length,
    social: emails.filter((e) => e.category === "Social").length,
    marketing: emails.filter((e) => e.category === "Marketing").length,
    spam: emails.filter((e) => e.category === "Spam").length,
    general: emails.filter((e) => e.category === "General").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Email Classifier
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {session.user?.name?.split(" ")[0] || session.user?.email}
                </span>
              </div>
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                {apiKey ? "API Key Set" : "Set API Key"}
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Fetch Emails
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={emailCount}
                    onChange={(e) =>
                      setEmailCount(parseInt(e.target.value) || 15)
                    }
                    className="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600">emails</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleFetchEmails}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <svg
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {loading ? "Fetching..." : "Fetch Emails"}
              </button>
              <button
                onClick={handleClassifyEmails}
                disabled={loading || emails.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {loading ? "Classifying..." : "Classify with AI"}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}
          {emails.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-600 mt-1">Total</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats.important}
                </p>
                <p className="text-xs text-red-700 mt-1">Important</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.promotional}
                </p>
                <p className="text-xs text-yellow-700 mt-1">Promotional</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.social}
                </p>
                <p className="text-xs text-blue-700 mt-1">Social</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.marketing}
                </p>
                <p className="text-xs text-green-700 mt-1">Marketing</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{stats.spam}</p>
                <p className="text-xs text-red-700 mt-1">Spam</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-600">
                  {stats.general}
                </p>
                <p className="text-xs text-gray-700 mt-1">General</p>
              </div>
            </div>
          )}
        </div>
        {emails.length > 0 ? (
          <EmailList emails={emails} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Emails Yet
              </h3>
              <p className="text-gray-600 mb-8">
                Click "Fetch Emails" above to load your latest emails from Gmail
                and classify them with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleFetchEmails}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Fetch My Emails
                </button>
                {!apiKey && (
                  <button
                    onClick={() => setShowApiKeyModal(true)}
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Set API Key
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSubmit={handleSaveApiKey}
      />
    </div>
  );
}
