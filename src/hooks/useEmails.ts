"use client";

import { useState } from "react";
import { Email } from "@/types/email";
import { STORAGE_KEYS } from "@/lib/storage/localStorage";
import { useLocalStorage } from "./useLocalStorage";

export function useEmails() {
  const [emails, setEmails] = useLocalStorage<Email[]>(STORAGE_KEYS.EMAILS, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async (count: number = 15) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/emails/fetch?count=${count}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch emails");
      }

      setEmails(data.emails);
      return data.emails;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const classifyEmails = async (apiKey: string) => {
    setLoading(true);
    setError(null);

    try {
      // Debug: Check what we're sending
      console.log("=== FRONTEND DEBUG ===");
      console.log(
        "API Key:",
        apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING"
      );
      console.log("Emails count:", emails.length);
      console.log(
        "Request body:",
        JSON.stringify({
          emails: emails.map((e) => ({ id: e.id, subject: e.subject })),
          apiKey: apiKey ? "PRESENT" : "MISSING",
        })
      );

      const response = await fetch("/api/emails/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: emails,
          apiKey: apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to classify emails");
      }

      setEmails(data.emails);
      return data.emails;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { emails, loading, error, fetchEmails, classifyEmails };
}
