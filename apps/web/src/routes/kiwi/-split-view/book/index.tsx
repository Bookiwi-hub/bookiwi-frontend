import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  ReaderContents,
  ReaderNextPageButton,
  ReaderPageProgress,
  ReaderPrevPageButton,
} from "../../-reader";

function Book() {
  return (
    <section className="relative size-full px-20 pb-16">
      <ReaderPrevPageButton className="group/button absolute left-0 top-0 flex h-full w-20 items-center justify-center">
        <ChevronLeftIcon className="size-6 opacity-0 transition-opacity group-hover/button:opacity-100" />
      </ReaderPrevPageButton>
      <ReaderContents />
      <ReaderNextPageButton className="group/button absolute right-0 top-0 flex h-full w-20 items-center justify-center">
        <ChevronRightIcon className="size-6 opacity-0 transition-opacity group-hover/button:opacity-100" />
      </ReaderNextPageButton>
      <div className="absolute inset-x-0 bottom-0 h-16">
        <ReaderPageProgress />
      </div>
    </section>
  );
}

export default Book;
