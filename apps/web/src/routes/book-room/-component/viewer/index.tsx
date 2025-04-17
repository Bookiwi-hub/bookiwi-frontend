import { SplitViewPane, SplitViewPaneGroup } from "../split-view";

import Annotation from "./annotation";
import { useAnnotationView } from "./annotation/context";
import {
  ANNOTATION_PANE_ID,
  READER_PANE_ID,
  ANNOTATION_PANE_SIZE_MIN,
  READER_PANE_SIZE_MIN,
} from "./constants/pane";
import Reader from "./reader";

function Viewer() {
  const { isOpen, isPinned } = useAnnotationView();

  return (
    <div className="relative size-full">
      <SplitViewPaneGroup>
        <SplitViewPane
          paneId={READER_PANE_ID}
          preferredSize={window.innerWidth}
          minSize={READER_PANE_SIZE_MIN}
          maxSize={window.innerWidth - ANNOTATION_PANE_SIZE_MIN}
        >
          <Reader />
        </SplitViewPane>

        {isPinned && (
          <SplitViewPane
            paneId={ANNOTATION_PANE_ID}
            preferredSize={ANNOTATION_PANE_SIZE_MIN}
            minSize={ANNOTATION_PANE_SIZE_MIN}
            maxSize={window.innerWidth - READER_PANE_SIZE_MIN}
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
