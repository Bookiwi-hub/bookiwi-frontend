import { memo } from "react";

import { useTruncatedText } from "../hooks/use-truncated-text";

import { formatDate } from "#/utils/format-date";

interface HighlightedTextProps {
  color: string;
  text: string;
  page: number;
  date: string;
  creatorName: string;
}

function HighlightedText({
  color,
  text,
  page,
  date,
  creatorName,
}: HighlightedTextProps) {
  const { displayText, isTruncated, isExpanded, toggleExpanded } =
    useTruncatedText({
      text,
      maxLength: 100,
    });
  const formattedDate = formatDate(new Date(date));

  return (
    <div
      className="my-4 rounded-md bg-gray-50 p-3 shadow-sm"
      style={{
        borderBottom: `4px solid ${color}`,
      }}
    >
      <p className="text-sm font-bold text-gray-900">
        &ldquo;{displayText}&rdquo;
        {isTruncated && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="ml-1 text-xs text-gray-700 hover:underline"
          >
            {isExpanded ? "접기" : "더 보기"}
          </button>
        )}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-700">{page} 페이지</span>
          <span className="ml-2 text-xs text-gray-600">by {creatorName}</span>
        </div>
        <span className="text-xs text-gray-700">{formattedDate}</span>
      </div>
    </div>
  );
}

export default memo(HighlightedText);
