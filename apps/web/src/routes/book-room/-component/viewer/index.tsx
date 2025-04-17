/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  const { isOpen, isPinned, close } = useAnnotationView();

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
        <SplitViewPaneGroup className="absolute inset-0" separatorThickness={2}>
          <SplitViewPane
            paneId="overlay"
            preferredSize={window.innerWidth - ANNOTATION_PANE_SIZE_MIN}
            minSize={BOOK_PANE_SIZE_MIN}
            maxSize={window.innerWidth - ANNOTATION_PANE_SIZE_MIN}
          >
            <div className="size-full bg-transparent" onClick={close} />
          </SplitViewPane>
          <SplitViewPane
            paneId={ANNOTATION_PANE_ID}
            preferredSize={ANNOTATION_PANE_SIZE_MIN}
            minSize={ANNOTATION_PANE_SIZE_MIN}
            maxSize={window.innerWidth - BOOK_PANE_SIZE_MIN}
          >
            <Annotation />
          </SplitViewPane>
        </SplitViewPaneGroup>
      )}
    </div>
  );
}

export default Viewer;
