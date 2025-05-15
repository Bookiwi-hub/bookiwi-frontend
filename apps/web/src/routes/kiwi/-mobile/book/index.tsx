import { PageControls } from "../-components/page-controls";
import { ReaderContents, ReaderPageProgress } from "../../-reader";

function MobileBook() {
  return (
    <section className="relative mx-auto flex size-full flex-col">
      <div className="relative grow">
        <PageControls>
          <ReaderContents className="size-full" />
        </PageControls>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-white">
        <ReaderPageProgress />
      </div>
    </section>
  );
}

export default MobileBook;
