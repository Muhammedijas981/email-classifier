"use client";

import { useState } from "react";
import { useEmails } from "@/hooks/useEmails";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage/localStorage";
import Button from "@/components/ui/Button";
import EmailList from "@/components/email/EmailList";
import ApiKeyModal from "@/components/auth/ApiKeyModal";
import { signOut } from "@/auth";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Email Classifier
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowApiKeyModal(true)}
                className="text-sm"
              >
                {apiKey ? "Update API Key" : "Add API Key"}
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-sm"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Number of emails:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={emailCount}
                onChange={(e) => setEmailCount(parseInt(e.target.value) || 15)}
                className="w-20 px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleFetchEmails} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Emails"}
              </Button>
              <Button
                onClick={handleClassifyEmails}
                disabled={loading || emails.length === 0}
              >
                {loading ? "Classifying..." : "Classify Emails"}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Email List */}
        {emails.length > 0 ? (
          <EmailList emails={emails} />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No emails loaded
            </h3>
            <p className="text-gray-600 mb-6">
              Click "Fetch Emails" to load your latest emails from Gmail
            </p>
          </div>
        )}
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSubmit={handleSaveApiKey}
      />
    </div>
  );
}
