import { Text, View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";
import KiwiCard from "@/components/screen/my-kiwis/kiwi-card";

export default function MyKiwisScreen() {
  // 내 키위 목록 조회
  // 새로운 키위 만들기 버튼 생성 -> 키위 생성 or 키위 초대코드 입력 버튼 팝오버 생성
  // 키위 눌렀을 때 키위 상세 페이지로 이동 혹은 바로입장하기 버튼

  return (
    <View className="p-6">
      <ThemedText type="title">내 키위</ThemedText>
      <KiwiCard
        image={require("../../../assets/images/book-cover-ex.png")}
        title="운수 나쁜 날"
        description="운수 나쁜 날 책 설명"
        participants={10}
        progress={50}
      />
    </View>
  );
}
