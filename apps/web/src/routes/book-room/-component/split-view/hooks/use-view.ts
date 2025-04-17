import { useSplitViewContext, ViewType } from "../context";

const useView = (viewId: string) => {
  const { viewMap } = useSplitViewContext();

  const view = viewMap.get(viewId);
  if (!view) {
    return {} as ViewType;
  }
  return view;
};

export default useView;
