import { PaneType, useSplitViewContext } from "../context";

const useView = (paneId: string) => {
  const { paneMap } = useSplitViewContext();

  const pane = paneMap.get(paneId);
  if (!pane) {
    return {} as PaneType;
  }
  return pane;
};

export default useView;
