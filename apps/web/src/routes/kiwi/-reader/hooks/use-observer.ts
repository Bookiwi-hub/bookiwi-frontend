import { useRef, useState } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import { bookAtom } from "../atoms";

import { debounce } from "#/utils/debounce";

const useObserver = () => {
  const book = useAtomValue(bookAtom);
  const prevSize = useRef(0);
  const [, setWidth] = useState(0);

  const handleResize = debounce((size: number) => {
    book?.rendition.resize();
    setWidth(size);
  }, 200);

  const observer = new ResizeObserver(([e]) => {
    const size = e?.contentRect.width ?? 0;

    if (size !== 0 && prevSize.current !== 0 && size !== prevSize.current) {
      handleResize(size);
    }

    prevSize.current = size;
  });

  return observer;
};

export default useObserver;
