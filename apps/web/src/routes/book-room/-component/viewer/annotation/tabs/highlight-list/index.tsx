import { useState } from "react";

import HighlightItem from "./item";

import {
  highlightList,
  type HighlightListType,
} from "#/DB/annotation-highlight-list";
import { ScrollArea } from "#/components/ui/scroll-area";

function HighlightList() {
  const [highlights] = useState<HighlightListType[]>(highlightList);

  return (
    <div className="flex size-full flex-col">
      <ScrollArea className="size-full p-4">
        <div className="mb-4 font-medium">
          하이라이트 목록 ({highlights.length})
        </div>
        {highlights.length > 0 ? (
          highlights.map((highlight) => (
            <HighlightItem key={highlight.id} highlight={highlight} />
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            하이라이트가 없습니다.
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default HighlightList;
