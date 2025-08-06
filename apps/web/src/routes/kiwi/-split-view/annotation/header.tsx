import { Pin, X, Highlighter } from "lucide-react";
import { memo } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  isAnnotationPinnedAtom,
  unpinAnnotationPaneAtom,
  pinAnnotationPaneAtom,
  closeAnnotationPaneAtom,
} from "../atoms";

import { cn } from "#/lib/utils";

function AnnotationHeader() {
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);
  const pinAnnotationPane = useSetAtom(pinAnnotationPaneAtom);
  const unpinAnnotationPane = useSetAtom(unpinAnnotationPaneAtom);
  const closeAnnotationPane = useSetAtom(closeAnnotationPaneAtom);

  const handlePin = () => {
    if (isAnnotationPinned) {
      unpinAnnotationPane();
    } else {
      pinAnnotationPane();
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg">
            <Highlighter size={16} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">하이라이트</h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePin}
            className={cn(
              "rounded-lg p-2 transition-colors",
              isAnnotationPinned
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
            )}
            aria-label={isAnnotationPinned ? "Unpin panel" : "Pin panel"}
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}
          >
            <Pin size={16} />
          </button>

          <button
            type="button"
            onClick={closeAnnotationPane}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(AnnotationHeader);
