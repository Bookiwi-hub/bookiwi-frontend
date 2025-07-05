import { View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";

export default function Header({ title }: { title: string }) {
  return (
    <View className="flex flex-row justify-between items-center">
      <ThemedText type="title">{title}</ThemedText>
    </View>
  );
}
