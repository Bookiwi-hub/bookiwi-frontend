import { Pin, X } from "lucide-react";

import { cn } from "#/lib/utils";

function AnnotationHeader() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-3">
      <h2 className="text-lg font-semibold">Notes & Comments</h2>
      <div className="flex items-center gap-2">
        <button
          type="button"
          // onClick={togglePin}
          className={cn(
            "rounded-md p-2",
            // isPinned ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100",
          )}
          // aria-label={isPinned ? "Unpin panel" : "Pin panel"}
        >
          <Pin size={18} />
        </button>
        <button
          type="button"
          // onClick={close}
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
