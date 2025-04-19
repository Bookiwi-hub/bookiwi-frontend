import { memo } from "react";

interface HighlightedTextProps {
  color: string;
  text: string;
  page: number;
  date: string;
}

function HighlightedText({ color, text, page, date }: HighlightedTextProps) {
  return (
    <div
      className="mb-2 rounded-md bg-gray-50 p-3 shadow-sm"
      style={{
        borderBottom: `4px solid ${color}`,
      }}
    >
      <p className="text-sm font-bold text-gray-900">&ldquo;{text}&rdquo;</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-700">Page {page}</span>
        <span className="text-xs text-gray-700">{date}</span>
      </div>
    </div>
  );
}

export default memo(HighlightedText);
