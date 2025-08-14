import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { toggleAnnotationPaneAtom } from "../../-split-view/atoms";
import { bookAtom, isCenterTouchedAtom } from "../atoms";

const useKeydown = () => {
  const book = useAtomValue(bookAtom);

  const toggleAnnotationPane = useSetAtom(toggleAnnotationPaneAtom);
  const setCenterTouched = useSetAtom(isCenterTouchedAtom);

  // 키보드 이벤트 처리
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "ArrowRight" || e.code === "ArrowDown") {
      book?.rendition.next();
      setCenterTouched(false);
    } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
      book?.rendition.prev();
      setCenterTouched(false);
    } else if (e.key === "m" && e.ctrlKey) {
      toggleAnnotationPane();
    }
  };

  return handleKeyDown;
};

export default useKeydown;
