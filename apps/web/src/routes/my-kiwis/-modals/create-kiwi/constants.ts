import { Step } from "./types";

export const Titles: Record<Step, string> = {
  [Step.One]: "새로운 키위 만들기",
  [Step.Two]: "새로운 키위 만들기",
  [Step.Three]: "키위 처리 중",
  [Step.Four]: "키위 생성 완료",
};

export const Descriptions: Record<Step, string> = {
  [Step.One]: "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.",
  [Step.Two]: "키위에서 사용할 EPUB 파일을 업로드하세요.",
  [Step.Three]: "EPUB 파일을 처리하고 키위를 생성하는 중입니다...",
  [Step.Four]: "아래 공유 코드를 사용해 친구들을 초대하세요.",
};
