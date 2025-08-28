import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { memo } from "react";

import {
  ReaderContents,
  ReaderPageButton,
  ReaderPageProgress,
} from "../../-reader";

function Book() {
  return (
    <section className="relative size-full px-20 pb-16">
      <ReaderPageButton
        direction="prev"
        className="group/button absolute left-0 top-0 flex h-full w-20 items-center justify-center"
      >
        <ChevronLeftIcon className="size-6 opacity-0 transition-opacity group-hover/button:opacity-100" />
      </ReaderPageButton>
      <ReaderContents />
      <ReaderPageButton
        direction="next"
        className="group/button absolute right-0 top-0 flex h-full w-20 items-center justify-center"
      >
        <ChevronRightIcon className="size-6 opacity-0 transition-opacity group-hover/button:opacity-100" />
      </ReaderPageButton>
      <div className="absolute inset-x-0 bottom-0 h-16">
        <ReaderPageProgress />
      </div>
    </section>
  );
}

export default memo(Book);
