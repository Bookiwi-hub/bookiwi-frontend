import { Pin, X } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  isAnnotationPinnedAtom,
  unpinAnnotationPaneAtom,
  pinAnnotationPaneAtom,
  closeAnnotationPaneAtom,
} from "../split-view/atoms";

import { setTabToHighlightListAtom, setTabToHighlightAtom } from "./atom";
import { TabType } from "./tabs/context";

import { TabsList, TabsTrigger } from "#/components/ui/tabs";
import { cn } from "#/lib/utils";

function AnnotationHeader() {
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);
  const pinAnnotationPane = useSetAtom(pinAnnotationPaneAtom);
  const unpinAnnotationPane = useSetAtom(unpinAnnotationPaneAtom);
  const closeAnnotationPane = useSetAtom(closeAnnotationPaneAtom);

  const setTabToHighlight = useSetAtom(setTabToHighlightAtom);
  const setTabToHighlightList = useSetAtom(setTabToHighlightListAtom);

  const handlePin = () => {
    if (isAnnotationPinned) {
      unpinAnnotationPane();
    } else {
      pinAnnotationPane();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 p-3">
      <TabsList className="w-full">
        <TabsTrigger
          className="w-full"
          value={TabType.HIGHLIGHT}
          onClick={setTabToHighlight}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          하이라이트
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value={TabType.HIGHLIGHT_LIST}
          onClick={setTabToHighlightList}
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
          onClick={closeAnnotationPane}
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
