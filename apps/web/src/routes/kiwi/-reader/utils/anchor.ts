export enum AnchorPosition {
  Before,
  After,
}

export enum AnchorMode {
  AVOID,
  ALIGN,
}
interface Anchor {
  offset: number;
  size: number;
  mode: AnchorMode;
  position: AnchorPosition;
}

export const calculateAnchorOffset = (
  viewportSize: number,
  viewSize: number,
  anchor: Anchor,
) => {
  const beforeAnchorOffset =
    anchor.mode === AnchorMode.ALIGN
      ? anchor.offset + anchor.size
      : anchor.offset;
  const afterAnchorOffset =
    anchor.mode === AnchorMode.ALIGN
      ? anchor.offset
      : anchor.offset + anchor.size;

  switch (anchor.position) {
    case AnchorPosition.Before: {
      // 1. 앵커 이전에 배치 가능한 경우 (happy case)
      if (viewSize <= beforeAnchorOffset) {
        return beforeAnchorOffset - viewSize;
      }

      // 2. 앵커 이후에 배치 가능한 경우 (ok case)
      if (viewSize <= viewportSize - afterAnchorOffset) {
        return afterAnchorOffset;
      }

      // 3. 공간이 부족한 경우 최대한 왼쪽에 붙인다  (sad case)
      return 0;
    }

    case AnchorPosition.After: {
      // 1. 앵커 이후에 배치 가능한 경우 (happy case)
      if (viewSize <= viewportSize - afterAnchorOffset) {
        return afterAnchorOffset;
      }

      // 2. 앵커 이전에 배치 가능한 경우 (ok case)
      if (viewSize <= beforeAnchorOffset) {
        return beforeAnchorOffset - viewSize;
      }

      // 3. 공간이 부족한 경우 최대한 오른쪽에 붙인다 (sad case)
      return Math.max(viewportSize - viewSize, 0);
    }

    default:
      return 0;
  }
};
