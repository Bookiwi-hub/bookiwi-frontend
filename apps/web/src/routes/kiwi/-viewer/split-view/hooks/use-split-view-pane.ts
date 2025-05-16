import { useMemo, useCallback, useState } from "react";

import { clamp } from "#/utils";

export interface UseSplitViewPaneParams {
  preferredSize?: number;
  minSize?: number;
  maxSize?: number;
}

const useSplitViewPane = ({
  preferredSize,
  minSize = 0,
  maxSize = Number.POSITIVE_INFINITY,
}: UseSplitViewPaneParams) => {
  const [size, setSize] = useState(preferredSize);

  const resize = useCallback(
    (delta: number) => {
      setSize((prev) => {
        if (prev) {
          return clamp(prev + delta, minSize, maxSize);
        }
        return prev;
      });
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
