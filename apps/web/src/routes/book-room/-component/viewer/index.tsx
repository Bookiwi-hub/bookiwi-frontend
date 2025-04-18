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
    <div className="relative size-full">
      <SplitViewPaneGroup className="flex size-full justify-end">
        <SplitViewPane
          pane={Pane.BOOK}
          resizable={isPinned}
          className={cn(
            "absolute left-0 z-0 size-full",
            "transition-all duration-200 ease-in-out",
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
            className="z-20 animate-slide-in-right shadow-2xl"
          >
            <Annotation />
          </SplitViewPane>
        )}
      </SplitViewPaneGroup>
    </div>
  );
}

export default Viewer;
