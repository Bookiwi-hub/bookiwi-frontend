import { memo, useState } from "react";

import { formatTimeAgo } from "#/utils/format-date";

interface HighlightedTextProps {
  color: string;
  text: string;
  page: number;
  date: string;
}

function HighlightedText({ color, text, page, date }: HighlightedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const isTruncated = text.length > maxLength;
  const formattedDate = formatTimeAgo(date);

  const displayText =
    isExpanded || !isTruncated ? text : `${text.slice(0, maxLength)}...`;

  return (
    <div
      className="my-4 rounded-md bg-gray-50 p-3 shadow-sm"
      style={{
        borderBottom: `4px solid ${color}`,
      }}
    >
      <p className="text-sm font-bold text-gray-900">
        &ldquo;{displayText}&rdquo;
      </p>
      {isTruncated && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-xs text-gray-700"
        >
          {isExpanded ? "접기" : "더 보기"}
        </button>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-700">{page} 페이지</span>
        <span className="text-xs text-gray-700">{formattedDate}</span>
      </div>
    </div>
  );
}

export default memo(HighlightedText);
