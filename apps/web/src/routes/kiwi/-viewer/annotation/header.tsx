import { Pin, X } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { Pane, usePane, useSplitViewContext } from "../split-view";
import {
  isAnnotationPinnedAtom,
  unpinAnnotationPaneAtom,
  pinAnnotationPaneAtom,
  closeAnnotationPaneAtom,
} from "../split-view/atoms";

import { useAnnotationTab, TabType } from "./tabs/context";

import { TabsList, TabsTrigger } from "#/components/ui/tabs";
import { cn } from "#/lib/utils";

function AnnotationHeader() {
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);
  const pinAnnotationPane = useSetAtom(pinAnnotationPaneAtom);
  const unpinAnnotationPane = useSetAtom(unpinAnnotationPaneAtom);
  const closeAnnotationPane = useSetAtom(closeAnnotationPaneAtom);

  const { setTabState } = useAnnotationTab();
  const bookPane = usePane(Pane.BOOK);
  const annotationPane = usePane(Pane.ANNOTATION);
  const { splitViewWidth } = useSplitViewContext();

  const handlePin = () => {
    if (isAnnotationPinned) {
      unpinAnnotationPane();
      bookPane.setSize(splitViewWidth);
    } else {
      pinAnnotationPane();
      bookPane.setSize(() => {
        if (splitViewWidth && annotationPane.size) {
          return splitViewWidth - annotationPane.size;
        }
        return splitViewWidth;
      });
    }
  };

  const handleClose = () => {
    closeAnnotationPane();
    bookPane.setSize(undefined);
  };

  const handleTabChange = (value: TabType) => {
    setTabState(value);
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 p-3">
      <TabsList className="w-full">
        <TabsTrigger
          className="w-full"
          value={TabType.HIGHLIGHT}
          onClick={() => handleTabChange(TabType.HIGHLIGHT)}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          하이라이트
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value={TabType.HIGHLIGHT_LIST}
          onClick={() => handleTabChange(TabType.HIGHLIGHT_LIST)}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          목록
        </TabsTrigger>
      </TabsList>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePin}
          className={cn(
            "rounded-md p-2",
            isAnnotationPinned
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100",
          )}
          aria-label={isAnnotationPinned ? "Unpin panel" : "Pin panel"}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          <Pin size={18} />
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md p-2 hover:bg-gray-100"
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default AnnotationHeader;
