import { Text, View } from "react-native";

export default function MyKiwisScreen() {
  // 내 키위 목록 조회
  // 새로운 키위 만들기 버튼 생성 -> 키위 생성 or 키위 초대코드 입력 버튼 팝오버 생성
  // 키위 눌렀을 때 키위 상세 페이지로 이동 혹은 바로입장하기 버튼

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">My Kiwis</Text>
    </View>
  );
}
