import { ReaderContents, ReaderPageProgress } from "../../-reader";

function MobileBook() {
  return (
    <section className="relative flex size-full flex-col px-12">
      <ReaderContents />
      <ReaderPageProgress />
    </section>
  );
}

export default MobileBook;
