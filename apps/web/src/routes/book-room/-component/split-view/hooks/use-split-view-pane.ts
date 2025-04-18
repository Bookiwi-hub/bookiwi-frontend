import { useMemo, useCallback, useState } from "react";

import clamp from "../utils/clamp";

export interface UseSplitViewPaneParams {
  preferredSize?: number;
  minSize?: number;
  maxSize?: number;
}

const useSplitViewPane = ({
  preferredSize = 0,
  minSize = 0,
  maxSize = Number.POSITIVE_INFINITY,
}: UseSplitViewPaneParams) => {
  const [size, setSize] = useState(preferredSize);

  const resize = useCallback(
    (delta: number) => {
      setSize((prev) => prev && clamp(prev + delta, minSize, maxSize));
    },
    [maxSize, minSize],
  );

  const resizePane = useMemo(
    () => (minSize === maxSize ? () => {} : resize),
    [minSize, maxSize, resize],
  );

  return useMemo(
    () => ({
      resize: resizePane,
      size,
      setSize,
    }),
    [resizePane, size, setSize],
  );
};

export default useSplitViewPane;
