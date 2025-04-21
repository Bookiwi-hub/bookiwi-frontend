import { type HighlightListType } from "#/DB/annotation-highlight-list";
import { useTruncatedText } from "#/routes/book-room/-component/viewer/annotation/tabs/hooks/use-truncated-text";
import { formatDate } from "#/utils/format-date";

function HighlightItem({ highlight }: { highlight: HighlightListType }) {
  const { displayText, isTruncated, isExpanded, toggleExpanded } =
    useTruncatedText({
      text: highlight.text,
      maxLength: 100,
    });

  return (
    <div className="mb-6 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
      <div
        className="mb-2 text-sm font-medium"
        style={{ color: highlight.creator.color }}
      >
        {highlight.creator.name}
      </div>
      <div className="mb-3 text-sm text-gray-700">
        {displayText}
        {isTruncated && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="ml-1 text-xs text-gray-700 hover:underline"
          >
            {isExpanded ? "접기" : "더 보기"}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>페이지 {highlight.page}</div>
        <div>{formatDate(highlight.date)}</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {highlight.totalComments > 0 ? `댓글 ${highlight.totalComments}개` : ""}
      </div>
    </div>
  );
}

export default HighlightItem;
