import { useState, useMemo } from "react";

import CreatorFilter from "./filter";
import HighlightItem from "./item";

import {
  highlightList,
  type HighlightListType,
} from "#/DB/annotation-highlight-list";
import { ScrollArea } from "#/components/ui/scroll-area";

function HighlightList() {
  const [highlights] = useState<HighlightListType[]>(highlightList);
  const [selectedCreators, setSelectedCreators] = useState<number[]>([]);

  const filteredHighlights = useMemo(() => {
    if (selectedCreators.length === 0) return highlights;
    return highlights.filter((highlight) =>
      selectedCreators.includes(highlight.creator.id),
    );
  }, [highlights, selectedCreators]);

  return (
    <div className="flex size-full flex-col">
      <div className="px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-medium">
            하이라이트 목록 ({filteredHighlights.length})
          </div>
          <div className="w-1/2">
            <CreatorFilter
              selectedCreators={selectedCreators}
              onCreatorsChange={setSelectedCreators}
            />
          </div>
        </div>
      </div>
      <ScrollArea className="size-full px-4 pb-4">
        {filteredHighlights.length > 0 ? (
          filteredHighlights.map((highlight) => (
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
