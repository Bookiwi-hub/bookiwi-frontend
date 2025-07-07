import { router } from "expo-router";
import { View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";
import { Plus } from "@/lib/icons/plus";
import { mainColor } from "@bookiwi/color";

export default function Header() {
  return (
    <View className="flex flex-row justify-between items-center">
      <ThemedText type="title">내 키위</ThemedText>
      <Plus color={mainColor} onPress={() => router.push("/create-kiwi")} />
    </View>
  );
}
