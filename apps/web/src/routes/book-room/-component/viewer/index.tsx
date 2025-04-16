import { ANNOTATION_VIEW_ID, READER_VIEW_ID } from "../../-constants/view-id";
import { ANNOTATION_VIEW_SIZE } from "../../-constants/view-size";
import Annotation from "../annotation";
import { useAnnotationView } from "../annotation/context";
import { SplitViewGroup, SplitViewItem } from "../split-view";

import Reader from "./reader";

import { cn } from "#/lib/utils";

function Viewer() {
  const { isOpen, isPinned } = useAnnotationView();

  return (
    <div className="relative size-full">
      <SplitViewGroup>
        <SplitViewItem id={READER_VIEW_ID} preferredSize={window.innerWidth}>
          <Reader />
        </SplitViewItem>

        {isPinned && (
          <SplitViewItem
            id={ANNOTATION_VIEW_ID}
            preferredSize={ANNOTATION_VIEW_SIZE}
            className={cn()}
          >
            <Annotation />
          </SplitViewItem>
        )}
      </SplitViewGroup>
      {isOpen && !isPinned && (
        <div
          className="absolute right-0 top-0 z-10 h-full border-l border-gray-200 bg-white p-1 shadow-xl"
          style={{
            width: ANNOTATION_VIEW_SIZE,
          }}
        >
          <Annotation />
        </div>
      )}
    </div>
  );
}

export default Viewer;
