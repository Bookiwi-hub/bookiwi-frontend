import { Pane } from "../constants/type";
import { useSplitViewContext } from "../context";

const usePane = (paneId: Pane) => {
  const { bookPane, annotationPane } = useSplitViewContext();

  return paneId === Pane.BOOK ? bookPane : annotationPane;
};

export default usePane;
