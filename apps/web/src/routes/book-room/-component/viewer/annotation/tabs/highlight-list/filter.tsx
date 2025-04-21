import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { participants } from "#/DB/participants";
import { Button } from "#/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { cn } from "#/lib/utils";

interface CreatorFilterProps {
  selectedCreators: number[];
  onCreatorsChange: (creatorIds: number[]) => void;
}

function CreatorFilter({
  selectedCreators,
  onCreatorsChange,
}: CreatorFilterProps) {
  const [open, setOpen] = useState(false);

  const handleToggleCreator = (creatorId: number) => {
    const newSelection = selectedCreators.includes(creatorId)
      ? selectedCreators.filter((id) => id !== creatorId)
      : [...selectedCreators, creatorId];

    onCreatorsChange(newSelection);
  };

  const selectAll = () => {
    onCreatorsChange(participants.map((p) => p.id));
  };

  const clearAll = () => {
    onCreatorsChange([]);
  };

  let displayText = "작성자 선택";
  if (selectedCreators.length > 0) {
    if (selectedCreators.length === participants.length) {
      displayText = "모든 작성자";
    } else {
      displayText = `${selectedCreators.length}명 선택됨`;
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
        >
          {displayText}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="flex items-center justify-between px-3 py-2">
          <Button variant="ghost" size="sm" onClick={selectAll}>
            모두 선택
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll}>
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
                selectedCreators.includes(participant.id) && "bg-accent/50",
              )}
              onClick={() => handleToggleCreator(participant.id)}
            >
              <div
                className="mr-2 size-3 rounded-full"
                style={{ backgroundColor: participant.color }}
              />
              <span>{participant.name}</span>
              {selectedCreators.includes(participant.id) && (
                <Check className="ml-auto size-4" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CreatorFilter;
