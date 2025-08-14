import { ComponentProps } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { bookAtom, isCenterTouchedAtom } from "../atoms";

function ReaderPrevPageButton(props: ComponentProps<"button">) {
  const book = useAtomValue(bookAtom);
  const { children, ...rest } = props;
  const setCenterTouched = useSetAtom(isCenterTouchedAtom);

  const goToPrevPage = () => {
    if (book && book.rendition) {
      book.rendition.prev();
      setCenterTouched(false);
    }
  };

  return (
    <button
      type="button"
      {...rest}
      onClick={goToPrevPage}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

function ReaderNextPageButton(props: ComponentProps<"button">) {
  const book = useAtomValue(bookAtom);
  const { children, ...rest } = props;
  const setCenterTouched = useSetAtom(isCenterTouchedAtom);

  const goToNextPage = () => {
    if (book && book.rendition) {
      book.rendition.next();
      setCenterTouched(false);
    }
  };

  return (
    <button
      type="button"
      {...rest}
      onClick={goToNextPage}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

export { ReaderPrevPageButton, ReaderNextPageButton };
