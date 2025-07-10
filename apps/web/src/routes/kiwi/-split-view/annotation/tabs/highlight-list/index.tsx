import { useState, useMemo, memo, useEffect } from "react";

import { useAtomValue } from "@bookiwi/jotai";
import { Highlight } from "@bookiwi/supabase/types";

import ParticipantsFilter from "./filter";
import HighlightItem from "./item";

import { ScrollArea } from "#/components/ui/scroll-area";
import { getHighlights } from "#/routes/kiwi/-reader/api";
import { kiwiIdAtom } from "#/routes/kiwi/-reader/atoms";

function HighlightList() {
  const kiwiId = useAtomValue(kiwiIdAtom);
  const [totalHighlights, setTotalHighlights] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!kiwiId) return;
    const fetchHighlights = async () => {
      try {
        const highlights = await getHighlights(kiwiId);
        setTotalHighlights(highlights);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHighlights();
  }, [kiwiId]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        하이라이트 목록을 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        하이라이트 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return <HighlightListContent totalHighlights={totalHighlights} />;
}

function HighlightListContent({
  totalHighlights,
}: {
  totalHighlights: Highlight[];
}) {
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
