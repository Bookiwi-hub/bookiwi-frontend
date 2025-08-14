import { ComponentProps } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { bookAtom, isCenterTouchedAtom } from "../atoms";

type ReaderPageButtonProps = ComponentProps<"button"> & {
  direction: "prev" | "next";
};

function ReaderPageButton({
  direction,
  children,
  ...rest
}: ReaderPageButtonProps) {
  const book = useAtomValue(bookAtom);
  const setCenterTouched = useSetAtom(isCenterTouchedAtom);

  const goToPage = () => {
    if (book && book.rendition) {
      if (direction === "prev") {
        book.rendition.prev();
      } else {
        book.rendition.next();
      }
      setCenterTouched(false);
    }
  };

  return (
    <button
      type="button"
      {...rest}
      onClick={goToPage}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

export default ReaderPageButton;
