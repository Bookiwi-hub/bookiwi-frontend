import {
  SplitViewPane,
  SplitViewPaneGroup,
  SplitViewSeparator,
} from "../split-view";
import { Pane } from "../split-view/constants/type";

import Annotation from "./annotation";
import { useAnnotationView } from "./annotation/context";
import Book from "./book";

import Overlay from "#/components/ui/overlay";

function Viewer() {
  const { isOpen, isPinned, close } = useAnnotationView();

  return (
    <div className="relative size-full">
      <SplitViewPaneGroup className="flex size-full justify-end">
        <SplitViewPane
          pane={Pane.BOOK}
          resizable={isPinned}
          className="absolute left-0 z-0 size-full"
        >
          <Book />
        </SplitViewPane>

        {isOpen && <SplitViewSeparator separatorThickness={isPinned ? 4 : 2} />}
        {isOpen && !isPinned && (
          <Overlay className="absolute z-10 bg-transparent" onClick={close} />
        )}

        {isOpen && (
          <SplitViewPane pane={Pane.ANNOTATION} className="z-20">
            <Annotation />
          </SplitViewPane>
        )}
      </SplitViewPaneGroup>
    </div>
  );
}

export default Viewer;
