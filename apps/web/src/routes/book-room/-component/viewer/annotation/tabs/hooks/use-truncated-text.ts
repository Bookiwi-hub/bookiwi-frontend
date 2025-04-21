import { useState } from "react";

interface UseTruncatedTextProps {
  text: string;
  maxLength?: number;
}

interface UseTruncatedTextResult {
  displayText: string;
  isTruncated: boolean;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export function useTruncatedText({
  text,
  maxLength = 100,
}: UseTruncatedTextProps): UseTruncatedTextResult {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = text.length > maxLength;

  const displayText =
    isExpanded || !isTruncated ? text : `${text.slice(0, maxLength)}...`;

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return {
    displayText,
    isTruncated,
    isExpanded,
    toggleExpanded,
  };
}
