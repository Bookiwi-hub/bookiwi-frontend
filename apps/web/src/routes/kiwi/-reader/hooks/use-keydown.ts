import { useAtomValue } from "@bookiwi/jotai";

import { bookAtom } from "../atoms";

const useKeydown = () => {
  const book = useAtomValue(bookAtom);
  // 키보드 이벤트 처리
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "ArrowRight" || e.code === "ArrowDown") {
      book?.rendition.next();
    } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
      book?.rendition.prev();
    }
  };

  return handleKeyDown;
};

export default useKeydown;
