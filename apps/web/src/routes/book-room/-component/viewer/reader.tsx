import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  ReaderContents,
  ReaderNextPageButton,
  ReaderPageProgress,
  ReaderPrevPageButton,
} from "../../-reader";

function Reader() {
  return (
    <section className="relative flex size-full flex-col px-12">
      <ReaderPrevPageButton className="absolute left-0 top-0 flex h-full w-12 items-center justify-center">
        <ChevronLeftIcon className="size-6" />
      </ReaderPrevPageButton>
      <ReaderContents className="size-full" />
      <ReaderNextPageButton className="absolute right-0 top-0 flex h-full w-12 items-center justify-center">
        <ChevronRightIcon className="size-6" />
      </ReaderNextPageButton>
      <ReaderPageProgress />
    </section>
  );
}

export default Reader;
