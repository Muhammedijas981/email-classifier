"use client";

import { Email, EmailCategory } from "@/types/email";
import EmailCard from "./EmailCard";
import { useState } from "react";

interface EmailListProps {
  emails: Email[];
}

export default function EmailList({ emails }: EmailListProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    EmailCategory | "All"
  >("All");

  const categories: (EmailCategory | "All")[] = [
    "All",
    "Important",
    "Promotional",
    "Social",
    "Marketing",
    "Spam",
    "General",
  ];

  const filteredEmails =
    selectedCategory === "All"
      ? emails
      : emails.filter((email) => email.category === selectedCategory);

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
            {category === "All" && ` (${emails.length})`}
            {category !== "All" &&
              ` (${emails.filter((e) => e.category === category).length})`}
          </button>
        ))}
      </div>

      {/* Email List */}
      <div className="space-y-3">
        {filteredEmails.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No emails found</p>
            <p className="text-sm">Try selecting a different category</p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <EmailCard key={email.id} email={email} />
          ))
        )}
      </div>
    </div>
  );
}
