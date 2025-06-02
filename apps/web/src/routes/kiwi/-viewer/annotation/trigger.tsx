import { MessageSquareQuote } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { usePane } from "../split-view";
import {
  isAnnotationOpenAtom,
  toggleAnnotationPaneAtom,
} from "../split-view/atoms";
import { Pane } from "../split-view/constants/type";

import { cn } from "#/lib/utils";

function AnnotationTrigger() {
  const isAnnotationOpen = useAtomValue(isAnnotationOpenAtom);
  const toggleAnnotationPane = useSetAtom(toggleAnnotationPaneAtom);

  const bookPane = usePane(Pane.BOOK);

  const handleClick = () => {
    if (isAnnotationOpen) {
      bookPane.setSize(window.innerWidth);
    }
    toggleAnnotationPane();
  };

  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center rounded-md p-2",
        isAnnotationOpen ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100",
      )}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
      aria-label="Toggle notes and comments"
    >
      <MessageSquareQuote size={24} />
      <span className="absolute bottom-6 left-6 size-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  );
}

export default AnnotationTrigger;
