import { useSplitViewContext } from "../context";

const useView = (key: string) => {
  const { viewMap } = useSplitViewContext();

  const view = viewMap.get(key);

  return view;
};

export default useView;
