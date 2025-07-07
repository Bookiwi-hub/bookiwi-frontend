import { useRouter } from "expo-router";
import { View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";
import { ArrowLeft } from "@/lib/icons/arrow-left";
import { mainColor } from "@bookiwi/color";

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <View className="flex flex-row justify-between items-center">
      <ArrowLeft color={mainColor} onPress={() => router.back()} />
      <View className="flex">
        <ThemedText type="title">{title}</ThemedText>
      </View>
    </View>
  );
}
