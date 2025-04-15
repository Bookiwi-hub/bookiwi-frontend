import { useEffect, useMemo, useCallback, useState } from "react";

import { useSplitViewContext } from "../context";
import clamp from "../utils/clamp";

export interface UseSplitViewPrams {
  preferredSize: number;
  minSize?: number;
  maxSize?: number;
  visible?: boolean;
}

const useSplitView = (
  key: React.FC | string,
  {
    preferredSize,
    minSize = 0,
    maxSize = Number.POSITIVE_INFINITY,
    visible = true,
  }: UseSplitViewPrams,
) => {
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
  const resizeView = minSize === maxSize ? undefined : resize;

  // 키가 컴포넌트 함수인 경우 함수 이름을 사용
  const stringKey = typeof key === "string" ? key : key.name;

  // 뷰 객체 생성 (메모이제이션으로 불필요한 리렌더링 방지)
  const view = useMemo(
    () => ({
      key: stringKey,
      resize: resizeView,
      visible,
    }),
    [stringKey, resizeView, visible],
  );

  // 뷰를 SplitView에 등록
  const { registerView } = useSplitViewContext();

  useEffect(() => {
    registerView(stringKey, view);
  }, [stringKey, registerView, view]);

  return { size };
};

export default useSplitView;
