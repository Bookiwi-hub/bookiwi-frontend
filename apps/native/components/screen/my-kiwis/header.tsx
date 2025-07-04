import { Button, View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";

export default function Header() {
  return (
    <View className="flex flex-row justify-between items-center">
      <ThemedText type="title">내 키위</ThemedText>
      <Button title="새로운 키위 만들기" />
    </View>
  );
}
