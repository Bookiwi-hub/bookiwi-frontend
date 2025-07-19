import { View, Text, ImageBackground } from "react-native";

import KakaoLogo from "@/assets/icons/kakao-logo.svg";
import { Button } from "@/components/ui/button";

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("../../../assets/images/login-bg.jpg")}
      className="w-full h-full"
      resizeMode="cover"
    >
      <View className="flex-1 bg-black/30 absolute inset-0" />
      <View className="w-full h-full px-6 p-16 flex flex-col justify-between">
        <View className="h-1/2 flex flex-col gap-2 pt-32 items-end px-2">
          <Text className="text-4xl">북키위,</Text>
          <Text className="text-4xl">함께 읽는 즐거움</Text>
        </View>

        <View className="h-1/2 flex flex-col justify-end">
          <Button className="rounded-xl bg-kakao w-full flex flex-row items-center justify-center !h-[50px]">
            <KakaoLogo />
            <Text className="text-black text-lg flex-1 text-center font-apple font-semibold">
              카카오 로그인
            </Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
