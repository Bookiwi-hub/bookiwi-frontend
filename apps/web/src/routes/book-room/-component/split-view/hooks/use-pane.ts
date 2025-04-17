import { PaneType, useSplitViewContext } from "../context";

const usePane = (paneId: string) => {
  const { paneMap } = useSplitViewContext();

  const pane = paneMap.get(paneId);
  if (!pane) {
    return {} as PaneType;
  }
  return pane;
};

export default usePane;
