"use client";

export const storage = {
  setItem: (key: string, value: any) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  },

  getItem: <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
      }
    }
    return null;
  },

  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },

  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

// Specific storage keys
export const STORAGE_KEYS = {
  OPENAI_API_KEY: "openai_api_key",
  EMAILS: "emails",
  LAST_FETCH: "last_fetch_timestamp",
} as const;
