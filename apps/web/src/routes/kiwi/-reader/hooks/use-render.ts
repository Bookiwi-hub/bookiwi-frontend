import { Book } from "@bookiwi/epubjs";
import { useAtomValue } from "@bookiwi/jotai";

import { initialCfiAtom, initialIsSinglePageAtom } from "../atoms";

const useRender = () => {
  const initialIsSinglePage = useAtomValue(initialIsSinglePageAtom);
  const initialCfi = useAtomValue(initialCfiAtom);

  const render = (node: HTMLDivElement, book: Book) => {
    // rendition 객체 생성
    const rendition = book.renderTo(node, {
      width: "100%",
      height: "100%",
      allowScriptedContent: true, // 자바스크립트 실행 허용
      spread: initialIsSinglePage ? "none" : "auto",
    });
    // 책 렌더링
    rendition.display(initialCfi || undefined);
    return rendition;
  };

  return render;
};

export default useRender;
