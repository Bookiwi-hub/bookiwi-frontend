import { useRouter } from "expo-router";
import { Text } from "react-native";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "@/lib/icons/ellipsis-vertical";
import { mainColor } from "@bookiwi/color";

interface KiwiCardDropdownProps {
  kiwiId: string;
}

export default function KiwiCardDropdown({ kiwiId }: KiwiCardDropdownProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical color={mainColor} className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent overlayStyle={{ left: -25, top: 5 }}>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onPress={() => router.push(`/kiwi-details/${kiwiId}`)}
          >
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
