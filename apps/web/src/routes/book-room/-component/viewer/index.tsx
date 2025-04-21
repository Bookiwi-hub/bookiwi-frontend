import {
  SplitViewPane,
  SplitViewPaneGroup,
  SplitViewSeparator,
} from "../split-view";
import { Pane } from "../split-view/constants/type";

import Annotation from "./annotation";
import { useAnnotationPane } from "./annotation/context";
import Book from "./book";

import Overlay from "#/components/ui/overlay";
import { cn } from "#/lib/utils";

function Viewer() {
  const { isOpen, isPinned, close } = useAnnotationPane();

  return (
    <SplitViewPaneGroup className="relative min-h-0 flex-1 justify-end">
      <SplitViewPane
        pane={Pane.BOOK}
        className={cn(
          "absolute left-0 z-0 size-full",
          "transition-all duration-200",
        )}
      >
        <Book />
      </SplitViewPane>

      {isOpen && (
        <SplitViewSeparator
          separatorThickness={isPinned ? 4 : 2}
          className="animate-slide-in-right"
        />
      )}
      {isOpen && !isPinned && (
        <Overlay className="absolute z-10 bg-transparent " onClick={close} />
      )}

      {isOpen && (
        <SplitViewPane
          pane={Pane.ANNOTATION}
          className="z-20 animate-slide-in-right bg-white shadow-2xl"
        >
          <Annotation />
        </SplitViewPane>
      )}
    </SplitViewPaneGroup>
  );
}

export default Viewer;
