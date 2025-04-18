import { useMemo, useCallback, useState } from "react";

import clamp from "../utils/clamp";

export interface UseSplitViewPaneParams {
  preferredSize?: number;
  minSize?: number;
  maxSize?: number;
  resizable?: boolean;
}

const useSplitViewPane = ({
  preferredSize = 0,
  minSize = 0,
  maxSize = Number.POSITIVE_INFINITY,
  resizable = true,
}: UseSplitViewPaneParams) => {
  // 크기 상태와 조절 함수 생성
  const [size, setSize] = useState(preferredSize);

  // 크기 조절 함수 - delta 값만큼 현재 크기를 변경하되 min/max 범위 내에서 제한
  const resize = useCallback(
    (delta: number) => {
      setSize((prev) => prev && clamp(prev + delta, minSize, maxSize));
    },
    [maxSize, minSize],
  );

  // 최소/최대 크기가 같으면 크기 조절 불가능
  const resizePane = useMemo(
    () => (minSize === maxSize ? () => {} : resize),
    [minSize, maxSize, resize],
  );

  return useMemo(
    () => ({
      resize: resizePane,
      size,
      setSize,
      resizable,
    }),
    [resizePane, size, setSize, resizable],
  );
};

export default useSplitViewPane;
