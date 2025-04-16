import { useSplitViewContext, SplitViewType } from "../context";

const useView = (key: string) => {
  const { viewMap } = useSplitViewContext();

  const view = viewMap.get(key);
  if (!view) {
    return {} as SplitViewType;
  }
  return view;
};

export default useView;
