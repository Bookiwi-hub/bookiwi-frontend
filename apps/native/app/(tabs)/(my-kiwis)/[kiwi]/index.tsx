import { router, useLocalSearchParams } from "expo-router";
import { Button, View } from "react-native";

import Header from "@/components/screen/kiwi/header";

export default function KiwiScreen() {
  const { kiwi } = useLocalSearchParams();

  return (
    <View className="pt-16 px-4">
      <Header title={kiwi as string} />
      <View className="flex flex-col gap-4">
        <Button title="뒤로가기" onPress={() => router.back()} />
      </View>
    </View>
  );
}
