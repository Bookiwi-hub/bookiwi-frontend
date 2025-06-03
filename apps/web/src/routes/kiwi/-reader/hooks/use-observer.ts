import { useRef } from "react";

import { useAtomValue, bookAtom } from "@bookiwi/jotai";

import { debounce } from "#/utils/debounce";

const useObserver = () => {
  const book = useAtomValue(bookAtom);
  const prevSize = useRef(0);
  const resizeRef = useRef<(() => void) | null>(null);

  const handleResize = debounce(() => {
    book?.rendition.resize();
  }, 200);

  resizeRef.current = handleResize;

  const observer = new ResizeObserver(([e]) => {
    const size = e?.contentRect.width ?? 0;

    if (size !== 0 && prevSize.current !== 0 && size !== prevSize.current) {
      handleResize();
    }

    prevSize.current = size;
  });

  return observer;
};

export default useObserver;
