import {
  SplitViewPane,
  SplitViewPaneGroup,
  SplitViewSeparator,
} from "../split-view";
import { Pane } from "../split-view/constants/type";

import Annotation from "./annotation";
import { useAnnotationView } from "./annotation/context";
import Book from "./book";

function Viewer() {
  const { isOpen, isPinned } = useAnnotationView();

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

        {isOpen && <SplitViewSeparator separatorThickness={isPinned ? 4 : 3} />}

        {isOpen && (
          <SplitViewPane pane={Pane.ANNOTATION} className="z-10">
            <Annotation />
          </SplitViewPane>
        )}
      </SplitViewPaneGroup>
    </div>
  );
}

export default Viewer;
