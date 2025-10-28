"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onSubmit,
}: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      setError("Please enter your OpenAI API key");
      return;
    }

    if (!apiKey.startsWith("sk-")) {
      setError("Invalid API key format. It should start with 'sk-'");
      return;
    }

    onSubmit(apiKey);
    setApiKey("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enter OpenAI API Key">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            To classify your emails, please provide your OpenAI API key. It will
            be stored locally in your browser.
          </p>
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setError("");
            }}
            className="w-full"
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          <p className="text-xs text-gray-500 mt-2">
            Get your API key from{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenAI Platform
            </a>
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save API Key</Button>
        </div>
      </form>
    </Modal>
  );
}
