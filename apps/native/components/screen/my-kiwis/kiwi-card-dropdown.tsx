import { Button, Text } from "react-native";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "@/lib/icons/ellipsis-vertical";
import { mainColor } from "@bookiwi/color";

export default function KiwiCardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical color={mainColor} className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Text className="text-black">상세보기</Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Text className="text-black">수정</Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Text className="text-black">삭제</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
