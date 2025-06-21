import { Text, View } from "react-native";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Avatar alt="avatar">
        <AvatarImage source={require("@/assets/images/adaptive-icon.png")} />
      </Avatar>
    </View>
  );
}
