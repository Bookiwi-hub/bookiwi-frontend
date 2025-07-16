import { useState } from "react";

interface UseCopyOptions {
  resetDelay?: number;
}

interface UseCopyReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useCopy(options: UseCopyOptions = {}): UseCopyReturn {
  const { resetDelay = 2000 } = options;
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy text:", error);
      setCopied(false);
    }
  };

  return { copied, copy };
}
