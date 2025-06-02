import { MessageSquareQuote } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { isAnnotationOpenAtom, toggleAnnotationPaneAtom } from "../atoms";

import { cn } from "#/lib/utils";

function AnnotationPaneTrigger() {
  const isAnnotationOpen = useAtomValue(isAnnotationOpenAtom);
  const toggleAnnotationPane = useSetAtom(toggleAnnotationPaneAtom);

  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center rounded-md p-2",
        isAnnotationOpen ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100",
      )}
      onClick={toggleAnnotationPane}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
      aria-label="Toggle notes and comments"
    >
      <MessageSquareQuote size={24} />
      <span className="absolute bottom-6 left-6 size-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  );
}

export default AnnotationPaneTrigger;
