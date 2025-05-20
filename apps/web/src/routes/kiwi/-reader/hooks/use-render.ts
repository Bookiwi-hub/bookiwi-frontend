import { Book } from "@bookiwi/epubjs";

import { useRecord } from "../record-context";
import { useSettings } from "../settings-context";

const useRender = () => {
  const { isSinglePage } = useSettings();
  const { currentCfi } = useRecord();

  const render = (node: HTMLDivElement, book: Book) => {
    // rendition 객체 생성
    const rendition = book.renderTo(node, {
      width: "100%",
      height: "100%",
      allowScriptedContent: true, // 자바스크립트 실행 허용
      spread: isSinglePage ? "none" : "auto",
    });
    // 책 렌더링
    rendition.display(currentCfi || undefined);
    return rendition;
  };

  return render;
};

export default useRender;
