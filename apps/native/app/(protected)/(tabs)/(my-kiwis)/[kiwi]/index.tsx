import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import Header from "@/components/screen/kiwi/header";

export default function KiwiScreen() {
  const { kiwi } = useLocalSearchParams();

  return (
    <View className="pt-16 px-4">
      <Header title={kiwi as string} />
    </View>
  );
}
