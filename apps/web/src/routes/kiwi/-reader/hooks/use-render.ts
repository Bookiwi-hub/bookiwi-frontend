import { Book } from "@bookiwi/epubjs";
import { useAtomValue } from "@bookiwi/jotai";

import {
  initialCfiAtom,
  initialIsSinglePageAtom,
  participantColorAtom,
} from "../atoms";

const useRender = () => {
  const initialIsSinglePage = useAtomValue(initialIsSinglePageAtom);
  const initialCfi = useAtomValue(initialCfiAtom);
  const participantColor = useAtomValue(participantColorAtom);

  const render = (node: HTMLDivElement, book: Book) => {
    // rendition 객체 생성
    const rendition = book.renderTo(node, {
      width: "100%",
      height: "100%",
      allowScriptedContent: true, // 자바스크립트 실행 허용
      spread: initialIsSinglePage ? "none" : "auto",
    });

    rendition.themes.default({
      html: {
        padding: "0 !important", // HTML 요소의 패딩을 0으로 강제 설정
      },
      body: {
        background: "transparent", // body 배경을 투명하게 설정
      },
      "a:any-link": {
        color: "#3b82f6 !important", // 모든 링크의 색상을 파란색(#3b82f6)으로 설정
        "text-decoration": "none !important", // 링크의 밑줄을 제거
      },
      "::selection": {
        "background-color": `rgba(${(participantColor ?? "#rgba(186, 230, 55)").replace(/[^\d,]/g, "")}, 0.3) !important`,
      },
    });
    // 책 렌더링
    rendition.display(initialCfi?.start || undefined);
    return rendition;
  };

  return render;
};

export default useRender;
