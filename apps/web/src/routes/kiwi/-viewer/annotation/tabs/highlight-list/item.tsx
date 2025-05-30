import { TabType, useAnnotationTab } from "../context";
import { useTruncatedText } from "../hooks/use-truncated-text";

import { formatDate } from "#/utils/format-date";

interface HighlightItemProps {
  id: number;
  text: string;
  color: string;
  name: string;
  page: number;
  date: string;
  totalComments: number;
}

function HighlightItem({
  id,
  text,
  color,
  name,
  page,
  date,
  totalComments,
}: HighlightItemProps) {
  const { displayText, isTruncated, isExpanded, toggleExpanded } =
    useTruncatedText({
      text,
      maxLength: 100,
    });

  const { setTabState, setHighlightId } = useAnnotationTab();

  const handleClick = () => {
    setTabState(TabType.HIGHLIGHT);
    setHighlightId(id);
  };

  return (
    <div
      className="mb-6 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="mb-2 text-sm font-medium" style={{ color }}>
        {name}
      </div>
      <div className="mb-3 text-sm text-gray-700">
        {displayText}
        {isTruncated && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
            className="ml-1 text-xs text-gray-700 hover:underline"
          >
            {isExpanded ? "접기" : "더 보기"}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>페이지 {page}</div>
        <div>{formatDate(date)}</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {totalComments > 0 ? `댓글 ${totalComments}개` : ""}
      </div>
    </div>
  );
}

export default HighlightItem;
