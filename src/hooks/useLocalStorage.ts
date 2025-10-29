"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/storage/localStorage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = storage.getItem<T>(key);
    if (item !== null) {
      setStoredValue(item);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
