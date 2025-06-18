import { useState, useMemo } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import ParticipantsFilter from "./filter";
import HighlightItem from "./item";

import { ScrollArea } from "#/components/ui/scroll-area";
import { annotationsTotalAtom } from "#/routes/kiwi/-reader/atoms";

function HighlightList() {
  const totalAnnotations = useAtomValue(annotationsTotalAtom);
  const [selectedParticipantsIds, setSelectedParticipantsIds] = useState<
    string[]
  >([]);

  const filteredAnnotations = useMemo(() => {
    if (selectedParticipantsIds.length === 0) return totalAnnotations;
    return totalAnnotations.filter((annotation) =>
      selectedParticipantsIds.includes(annotation.participantId),
    );
  }, [totalAnnotations, selectedParticipantsIds]);

  return (
    <div className="flex size-full flex-col">
      <div className="px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-medium">
            하이라이트 목록 ({filteredAnnotations.length})
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
        {filteredAnnotations.length > 0 ? (
          filteredAnnotations.map((annotation) => (
            <HighlightItem key={annotation.id} annotation={annotation} />
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
