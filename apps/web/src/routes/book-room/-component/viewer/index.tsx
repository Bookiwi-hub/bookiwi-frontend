import { SplitViewPane, SplitViewPaneGroup } from "../split-view";

import Annotation from "./annotation";
import { useAnnotationView } from "./annotation/context";
import Book from "./book";
import {
  ANNOTATION_PANE_ID,
  BOOK_PANE_ID,
  ANNOTATION_PANE_SIZE_MIN,
  BOOK_PANE_SIZE_MIN,
} from "./constants/pane";

function Viewer() {
  const { isOpen, isPinned } = useAnnotationView();

  return (
    <div className="relative size-full">
      <SplitViewPaneGroup>
        <SplitViewPane
          paneId={BOOK_PANE_ID}
          preferredSize={window.innerWidth}
          minSize={BOOK_PANE_SIZE_MIN}
          maxSize={window.innerWidth - ANNOTATION_PANE_SIZE_MIN}
        >
          <Book />
        </SplitViewPane>

        {isPinned && (
          <SplitViewPane
            paneId={ANNOTATION_PANE_ID}
            preferredSize={ANNOTATION_PANE_SIZE_MIN}
            minSize={ANNOTATION_PANE_SIZE_MIN}
            maxSize={window.innerWidth - BOOK_PANE_SIZE_MIN}
          >
            <Annotation />
          </SplitViewPane>
        )}
      </SplitViewPaneGroup>
      {isOpen && !isPinned && (
        <div
          className="absolute right-0 top-0 z-10 h-full border-l border-gray-200 bg-white p-1 shadow-xl"
          style={{
            width: ANNOTATION_PANE_SIZE_MIN,
          }}
        >
          <Annotation />
        </div>
      )}
    </div>
  );
}

export default Viewer;
