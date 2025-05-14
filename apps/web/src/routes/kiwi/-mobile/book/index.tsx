import { ReaderContents, ReaderPageProgress } from "../../-reader";

function MobileBook() {
  return (
    <section className="relative flex size-full flex-col px-9">
      <ReaderContents className="size-full" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-white">
        <ReaderPageProgress />
      </div>
    </section>
  );
}

export default MobileBook;
