import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function KiwiDetailsScreen() {
  const { kiwi } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Kiwi Details</Text>
      <Text>{kiwi}</Text>
    </View>
  );
}
