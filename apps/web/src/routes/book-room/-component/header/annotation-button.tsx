import { MessageSquareQuote } from "lucide-react";

import { cn } from "#/lib/utils";

function AnnotationButton() {
  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center rounded-md p-2",
        // isOpen ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100",
      )}
      // onClick={toggle}
      aria-label="Toggle notes and comments"
    >
      <MessageSquareQuote size={24} />
      <span className="absolute bottom-6 left-6 size-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  );
}

export default AnnotationButton;
