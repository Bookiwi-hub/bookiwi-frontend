import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  ReaderContents,
  ReaderNextPageButton,
  ReaderPageProgress,
  ReaderPrevPageButton,
} from "../../../-reader";

function Book() {
  return (
    <section className="relative size-full px-16 pb-16">
      <ReaderPrevPageButton className="absolute left-0 top-0 flex h-full w-16 items-center justify-center">
        <ChevronLeftIcon className="size-6" />
      </ReaderPrevPageButton>
      <ReaderContents className="size-full" />
      <ReaderNextPageButton className="absolute right-0 top-0 flex h-full w-16 items-center justify-center">
        <ChevronRightIcon className="size-6" />
      </ReaderNextPageButton>
      <div className="absolute inset-x-0 bottom-0 h-16">
        <ReaderPageProgress />
      </div>
    </section>
  );
}

export default Book;
