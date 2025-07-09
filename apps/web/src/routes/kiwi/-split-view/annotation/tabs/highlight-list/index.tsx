import { useState, useMemo, memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import ParticipantsFilter from "./filter";
import HighlightItem from "./item";

import { ScrollArea } from "#/components/ui/scroll-area";
import { highlightsAtom } from "#/routes/kiwi/-reader/atoms";

function HighlightList() {
  const totalHighlights = useAtomValue(highlightsAtom);
  const [selectedParticipantsIds, setSelectedParticipantsIds] = useState<
    string[]
  >([]);

  const filteredHighlights = useMemo(() => {
    if (selectedParticipantsIds.length === 0) return totalHighlights;
    return totalHighlights.filter((highlight) =>
      selectedParticipantsIds.includes(highlight.participantId),
    );
  }, [totalHighlights, selectedParticipantsIds]);

  return (
    <div className="flex size-full flex-col">
      <div className="px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-medium">
            하이라이트 목록 ({filteredHighlights.length})
          </div>
          <div className="w-1/2">
            <ParticipantsFilter
              selectedParticipantsIds={selectedParticipantsIds}
              onParticipantsIdsChange={setSelectedParticipantsIds}
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

export default memo(HighlightList);
