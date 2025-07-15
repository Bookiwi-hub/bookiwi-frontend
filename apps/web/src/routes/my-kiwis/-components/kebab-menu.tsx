import { LogOut, MoreVertical, Trash2 } from "lucide-react";

import { useSetAtom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

import {
  openDeleteKiwiModalAtom,
  openLeaveKiwiModalAtom,
} from "../-modals/atoms";

import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import userManager from "#/managers/user";

interface KebabMenuProps {
  align?: "start" | "center" | "end";
  kiwi: MyKiwi;
}

function KebabMenu({ align = "center", kiwi }: KebabMenuProps) {
  const openDeleteKiwiModal = useSetAtom(openDeleteKiwiModalAtom);
  const openLeaveKiwiModal = useSetAtom(openLeaveKiwiModalAtom);
  const isParticipant = kiwi.participants.some(
    (participant) => participant.userId === userManager.userId,
  );
  const isGuestMode = userManager.isGuest;

  if (isGuestMode && !isParticipant) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="size-8 rounded-full bg-black/20 p-0 backdrop-blur-sm hover:bg-black/30"
          tabIndex={-1}
          autoFocus={false}
          onFocus={(e) => e.target.blur()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <MoreVertical className="size-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48">
        {!isGuestMode && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              openDeleteKiwiModal(kiwi);
            }}
          >
            <Trash2 className="mr-2 size-4" />
            삭제하기
          </DropdownMenuItem>
        )}
        {isParticipant && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              openLeaveKiwiModal(kiwi);
            }}
          >
            <LogOut className="mr-2 size-4" />
            나가기
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default KebabMenu;
