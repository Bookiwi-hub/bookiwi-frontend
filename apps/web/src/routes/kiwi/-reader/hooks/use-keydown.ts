import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { toggleAnnotationPaneAtom } from "../../-split-view/atoms";
import { bookAtom } from "../atoms";

const useKeydown = () => {
  const book = useAtomValue(bookAtom);

  const toggleAnnotationPane = useSetAtom(toggleAnnotationPaneAtom);

  // 키보드 이벤트 처리
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "ArrowRight" || e.code === "ArrowDown") {
      book?.rendition.next();
    } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
      book?.rendition.prev();
    } else if (e.key === "m" && e.ctrlKey) {
      toggleAnnotationPane();
    }
  };

  return handleKeyDown;
};

export default useKeydown;
