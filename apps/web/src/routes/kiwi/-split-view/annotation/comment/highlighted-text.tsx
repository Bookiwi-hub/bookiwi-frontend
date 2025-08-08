import { Trash2 } from "lucide-react";
import { memo } from "react";

import { useTruncatedText } from "#/hooks";
import { truncate, formatDate } from "#/utils";

interface HighlightedTextProps {
  color: string;
  text: string;
  date: string;
  creatorName: string;
  sectionLabel?: string;
  isMine?: boolean;
  onDelete?: () => void;
}

function HighlightedText({
  color,
  text,
  date,
  creatorName,
  sectionLabel,
  isMine = false,
  onDelete,
}: HighlightedTextProps) {
  const { displayText, isTruncated, isExpanded, toggleExpanded } =
    useTruncatedText({
      text,
      maxLength: 100,
    });

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
            className="ml-3 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            {isExpanded ? "접기" : "더 보기"}
          </button>
        )}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-700">
            {sectionLabel ? truncate(sectionLabel, 20) : ""}
          </span>
          <span className="ml-2 text-xs text-gray-600">by {creatorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-700">{formatDate(date)}</span>
          {isMine && (
            <button
              type="button"
              className="group flex size-6 items-center justify-center rounded-full transition-colors hover:bg-red-50"
              title="하이라이트 삭제"
              onClick={onDelete}
            >
              <Trash2 className="size-4 text-gray-400 group-hover:text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(HighlightedText);
