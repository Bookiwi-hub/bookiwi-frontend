/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SplitViewPane, SplitViewSeparator, usePane } from "../split-view";

import Annotation from "./annotation";
import { useAnnotationView } from "./annotation/context";
import Book from "./book";
import {
  ANNOTATION_PANE_ID,
  BOOK_PANE_ID,
  ANNOTATION_PANE_SIZE_MIN,
  BOOK_PANE_SIZE_MIN,
} from "./constants/pane";

import { cn } from "#/lib/utils";

function Viewer() {
  const { isOpen, isPinned, close } = useAnnotationView();
  const annotationPane = usePane(ANNOTATION_PANE_ID);

  return (
    <div className="relative size-full">
      <div className={cn("flex size-full", isPinned && "justify-end")}>
        <SplitViewPane
          paneId={BOOK_PANE_ID}
          preferredSize={window.innerWidth}
          minSize={BOOK_PANE_SIZE_MIN}
          maxSize={window.innerWidth - ANNOTATION_PANE_SIZE_MIN}
          className="absolute left-0 z-0 size-full"
        >
          <Book />
        </SplitViewPane>

        {isOpen && !isPinned && (
          <SplitViewPane
            paneId="transparent"
            preferredSize={
              annotationPane.size
                ? window.innerWidth - annotationPane.size
                : window.innerWidth - ANNOTATION_PANE_SIZE_MIN
            }
            minSize={BOOK_PANE_SIZE_MIN}
            maxSize={window.innerWidth - ANNOTATION_PANE_SIZE_MIN}
            className="z-10 size-full bg-transparent"
            onClick={close}
          />
        )}

        {isOpen && (
          <SplitViewSeparator
            prevPaneId={isPinned ? BOOK_PANE_ID : "transparent"}
            currentPaneId={ANNOTATION_PANE_ID}
            separatorThickness={isPinned ? 4 : 3}
          />
        )}

        {isOpen && (
          <SplitViewPane
            paneId={ANNOTATION_PANE_ID}
            preferredSize={ANNOTATION_PANE_SIZE_MIN}
            minSize={ANNOTATION_PANE_SIZE_MIN}
            maxSize={window.innerWidth - BOOK_PANE_SIZE_MIN}
            className="z-10 size-full"
          >
            <Annotation />
          </SplitViewPane>
        )}
      </div>
    </div>
  );
}

export default Viewer;
