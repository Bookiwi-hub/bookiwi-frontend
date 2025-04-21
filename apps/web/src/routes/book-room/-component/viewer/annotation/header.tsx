import { Pin, X } from "lucide-react";

import { usePane } from "../../split-view";
import { Pane } from "../../split-view/constants/type";

import { useAnnotationPane } from "./context";
import { AnnotationTab } from "./tabs/tab";

import { TabsList, TabsTrigger } from "#/components/ui/tabs";
import { cn } from "#/lib/utils";

function AnnotationHeader() {
  const { isPinned, pin, unpin, close } = useAnnotationPane();
  const bookPane = usePane(Pane.BOOK);
  const annotationPane = usePane(Pane.ANNOTATION);

  const handlePin = () => {
    if (isPinned) {
      unpin();
      bookPane.setSize(window.innerWidth);
    } else {
      pin();
      bookPane.setSize(window.innerWidth - annotationPane.size);
    }
  };

  const handleClose = () => {
    close();
    bookPane.setSize(window.innerWidth);
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 p-3">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value={AnnotationTab.HIGHLIGHT}>
          하이라이트
        </TabsTrigger>
        <TabsTrigger className="w-full" value={AnnotationTab.HIGHLIGHT_LIST}>
          목록
        </TabsTrigger>
      </TabsList>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePin}
          className={cn(
            "rounded-md p-2",
            isPinned ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100",
          )}
          aria-label={isPinned ? "Unpin panel" : "Pin panel"}
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
