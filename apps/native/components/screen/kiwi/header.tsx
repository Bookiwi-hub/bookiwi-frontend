import { View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";
import { MAIN_COLOR } from "@/constants/colors";
import { Plus } from "@/lib/icons/plus";

export default function Header({ title }: { title: string }) {
  return (
    <View className="flex flex-row justify-between items-center">
      <ThemedText type="title">{title}</ThemedText>
      <Plus color={MAIN_COLOR} />
    </View>
  );
}
