import { ComponentProps } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import { bookAtom } from "../atoms";

function ReaderPrevPageButton(props: ComponentProps<"button">) {
  const book = useAtomValue(bookAtom);
  const { children, ...rest } = props;

  const goToPrevPage = () => {
    if (book && book.rendition) {
      book.rendition.prev();
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

  const goToNextPage = () => {
    if (book && book.rendition) {
      book.rendition.next();
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
