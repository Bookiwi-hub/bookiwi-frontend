import { Check, ChevronsUpDown } from "lucide-react";
import { memo, useState } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import { Button } from "#/components/ui/button";
import Dot from "#/components/ui/dot";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { cn } from "#/lib/utils";
import { participantsAtom } from "#/routes/kiwi/-reader/atoms";

interface ParticipantsFilterProps {
  selectedParticipantsIds: string[];
  onParticipantsIdsChange: (participantIds: string[]) => void;
}

function ParticipantsFilter({
  selectedParticipantsIds,
  onParticipantsIdsChange,
}: ParticipantsFilterProps) {
  const [open, setOpen] = useState(false);
  const participants = useAtomValue(participantsAtom);
  const participantIds = participants.map((p) => p.id);

  const handleToggleParticipant = (participantId: string) => {
    const newSelection = selectedParticipantsIds.includes(participantId)
      ? selectedParticipantsIds.filter((id) => id !== participantId)
      : [...selectedParticipantsIds, participantId];

    onParticipantsIdsChange(newSelection);
  };

  const selectAll = () => {
    onParticipantsIdsChange(participantIds);
  };

  const clearAll = () => {
    onParticipantsIdsChange([]);
  };

  let displayText = "전체 목록";
  if (selectedParticipantsIds.length > 0) {
    if (selectedParticipantsIds.length === participantIds.length) {
      displayText = "전체 목록";
    } else {
      displayText = `${selectedParticipantsIds.length}명 선택됨`;
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          {displayText}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="flex items-center justify-between px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={selectAll}
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}
          >
            모두 선택
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}
          >
            모두 해제
          </Button>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {participants.map((participant) => (
            <Button
              key={participant.id}
              variant="ghost"
              className={cn(
                "flex w-full items-center justify-start px-3 py-2",
                selectedParticipantsIds.includes(participant.id) &&
                  "bg-accent/50",
              )}
              onClick={() => handleToggleParticipant(participant.id)}
              onMouseDown={(e) => e.preventDefault()}
              tabIndex={-1}
            >
              <Dot color={participant.color} size="sm" className="mr-2" />
              <span>{participant.name}</span>
              {selectedParticipantsIds.includes(participant.id) && (
                <Check className="ml-auto size-4" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default memo(ParticipantsFilter);
