import { HighlightType } from "#/DB/annotation-highlight";

interface HighlightedTextProps {
  highlight: HighlightType;
}

function HighlightedText({ highlight }: HighlightedTextProps) {
  return (
    <div
      className="mb-2 rounded-md bg-gray-50 p-3 shadow-sm"
      style={{
        borderBottom: `4px solid ${highlight.creator.color}`,
      }}
    >
      <p className="text-sm font-bold text-gray-900">
        &ldquo;{highlight.text}&rdquo;
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-700">Page {highlight.page}</span>
        <span className="text-xs text-gray-700">{highlight.date}</span>
      </div>
    </div>
  );
}

export default HighlightedText;
