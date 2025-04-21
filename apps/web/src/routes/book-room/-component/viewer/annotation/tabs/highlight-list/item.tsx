import { TabType, useAnnotationTab } from "../context";

import { useTruncatedText } from "#/routes/book-room/-component/viewer/annotation/tabs/hooks/use-truncated-text";
import { formatDate } from "#/utils/format-date";

interface HighlightItemProps {
  text: string;
  color: string;
  name: string;
  page: number;
  date: string;
  totalComments: number;
}

function HighlightItem({
  text,
  color,
  name,
  page,
  date,
  totalComments,
}: HighlightItemProps) {
  const { displayText } = useTruncatedText({
    text,
    maxLength: 100,
  });

  const { setTabState } = useAnnotationTab();

  return (
    <div
      className="mb-6 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
      onClick={() => setTabState(TabType.HIGHLIGHT)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setTabState(TabType.HIGHLIGHT);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="mb-2 text-sm font-medium" style={{ color }}>
        {name}
      </div>
      <div className="mb-3 text-sm text-gray-700">{displayText}</div>
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
