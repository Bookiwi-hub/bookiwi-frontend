import { Highlighter as HighlightIcon } from "lucide-react";
import { memo } from "react";

interface NotSelectedProps {
  color: string;
}
function NotSelected({ color }: NotSelectedProps) {
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center p-8 text-center">
      <div
        className="mb-4 flex size-16 items-center justify-center rounded-full"
        style={{ backgroundColor: color, opacity: 0.4 }}
      >
        <HighlightIcon className="size-8 text-gray-500" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        선택된 하이라이트가 없습니다
      </h3>

      <p className="max-w-xs text-sm leading-relaxed text-gray-500">
        텍스트를 드래그하여 하이라이트를 생성하거나
        <br />
        기존 하이라이트를 클릭해보세요
      </p>
    </div>
  );
}

export default memo(NotSelected);
