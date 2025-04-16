import { ANNOTATION_VIEW_ID, READER_VIEW_ID } from "../../-constants/view-id";
import {
  READER_VIEW_SIZE_MIN,
  ANNOTATION_VIEW_SIZE_MIN,
} from "../../-constants/view-size";
import { SplitViewGroup, SplitViewItem } from "../split-view";

import Annotation from "./annotation";
import { useAnnotationView } from "./annotation/context";
import Reader from "./reader";

function Viewer() {
  const { isOpen, isPinned } = useAnnotationView();

  return (
    <div className="relative size-full">
      <SplitViewGroup>
        <SplitViewItem
          id={READER_VIEW_ID}
          preferredSize={window.innerWidth}
          minSize={READER_VIEW_SIZE_MIN}
          maxSize={window.innerWidth - ANNOTATION_VIEW_SIZE_MIN}
        >
          <Reader />
        </SplitViewItem>

        {isPinned && (
          <SplitViewItem
            id={ANNOTATION_VIEW_ID}
            preferredSize={ANNOTATION_VIEW_SIZE_MIN}
            minSize={ANNOTATION_VIEW_SIZE_MIN}
            maxSize={window.innerWidth - READER_VIEW_SIZE_MIN}
          >
            <Annotation />
          </SplitViewItem>
        )}
      </SplitViewGroup>
      {isOpen && !isPinned && (
        <div
          className="absolute right-0 top-0 z-10 h-full border-l border-gray-200 bg-white p-1 shadow-xl"
          style={{
            width: ANNOTATION_VIEW_SIZE_MIN,
          }}
        >
          <Annotation />
        </div>
      )}
    </div>
  );
}

export default Viewer;
