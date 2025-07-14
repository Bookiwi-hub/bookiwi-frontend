import { MoreVertical, Trash2 } from "lucide-react";

import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";

interface KebabMenuProps {
  align?: "start" | "center" | "end";
  onDelete: () => Promise<void> | void;
}

function KebabMenu({ onDelete, align = "center" }: KebabMenuProps) {
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
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="mr-2 size-4" />
          키위 삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default KebabMenu;
