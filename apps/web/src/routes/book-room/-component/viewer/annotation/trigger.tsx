import { MessageSquareQuote } from "lucide-react";

import { useView } from "../../split-view";
import { READER_VIEW_ID } from "../constants/view-id";

import { useAnnotationView } from "./context";

import { cn } from "#/lib/utils";

function AnnotationTrigger() {
  const { isOpen, toggle } = useAnnotationView();
  const view = useView(READER_VIEW_ID);

  const handleClick = () => {
    if (isOpen) {
      view.setSize(window.innerWidth);
    }
    toggle();
  };

  return (
    <button
      type="button"
      className={cn(
        "relative flex items-center justify-center rounded-md p-2",
        isOpen ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100",
      )}
      onClick={handleClick}
      aria-label="Toggle notes and comments"
    >
      <MessageSquareQuote size={24} />
      <span className="absolute bottom-6 left-6 size-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  );
}

export default AnnotationTrigger;
