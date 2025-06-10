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
  const layoutAfterAnchorBoundary =
    anchor.mode === AnchorMode.ALIGN
      ? anchor.offset
      : anchor.offset + anchor.size;
  const layoutBeforeAnchorBoundary =
    anchor.mode === AnchorMode.ALIGN
      ? anchor.offset + anchor.size
      : anchor.offset;

  switch (anchor.position) {
    case AnchorPosition.Before: {
      // 1. 앵커 이후에 배치 가능한 경우 (happy case)
      if (viewSize <= viewportSize - layoutAfterAnchorBoundary) {
        return layoutAfterAnchorBoundary;
      }

      // 2. 앵커 이전에 배치 가능한 경우 (ok case)
      if (viewSize <= layoutBeforeAnchorBoundary) {
        return layoutBeforeAnchorBoundary - viewSize;
      }

      // 3. 공간이 부족한 경우 앵커 위에 겹쳐서 배치 (sad case)
      return Math.max(viewportSize - viewSize, 0);
    }

    case AnchorPosition.After: {
      // 1. 앵커 이전에 배치 가능한 경우 (happy case)
      if (viewSize <= layoutBeforeAnchorBoundary) {
        return layoutBeforeAnchorBoundary - viewSize;
      }

      // 2. 앵커 이후에 배치 가능한 경우 (ok case)
      if (viewSize <= viewportSize - layoutAfterAnchorBoundary) {
        return layoutAfterAnchorBoundary;
      }

      // 3. 공간이 부족한 경우 앵커 위에 겹쳐서 배치 (sad case)
      return 0;
    }

    default:
      return 0;
  }
};
