import { memo } from "react";

import { useTruncatedText } from "#/routes/book-room/-component/viewer/annotation/tabs/hooks/use-truncated-text";
import { formatDate } from "#/utils/format-date";

interface HighlightedTextProps {
  color: string;
  text: string;
  page: number;
  date: string;
}

function HighlightedText({ color, text, page, date }: HighlightedTextProps) {
  const { displayText, isTruncated, isExpanded, toggleExpanded } =
    useTruncatedText({
      text,
      maxLength: 100,
    });
  const formattedDate = formatDate(date);

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
          onClick={toggleExpanded}
          className="mt-1 text-xs text-gray-700 hover:underline"
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
