import { useAtomValue } from "@bookiwi/jotai";

import { currentViewAtom, selectionAtom } from "../atoms";
import {
  AnchorMode,
  AnchorPosition,
  calculateAnchorOffset,
  isForwardSelection,
} from "../utils";

interface TextSelectionPosition {
  leftOffset: number;
  topOffset: number;
}

const useSelectionMenuOffset = (): TextSelectionPosition | null => {
  const currentView = useAtomValue(currentViewAtom);
  const selection = useAtomValue(selectionAtom);

  if (!currentView || !selection) {
    return null;
  }

  const viewElement = currentView.element;
  const containerElement = viewElement.parentElement;

  if (!viewElement || !containerElement) {
    return null;
  }

  const viewRect = viewElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  if (!containerRect || !viewRect) {
    return null;
  }

  const forward = isForwardSelection(selection);
  const range = selection.getRangeAt(0);

  if (!range) {
    return null;
  }

  const rects = [...range.getClientRects()].filter((r) => Math.round(r.width));
  const anchorRect = forward ? rects[rects.length - 1] : rects[0];
  const endContainer = forward ? range.endContainer : range.startContainer;

  if (!anchorRect || !endContainer) {
    return null;
  }

  const currentLineHeight = parseFloat(
    getComputedStyle(endContainer.parentElement!).lineHeight,
  );
  const lineHeight = Number.isNaN(currentLineHeight)
    ? anchorRect.height
    : currentLineHeight;

  const leftOffset = calculateAnchorOffset(containerRect.width, 81, {
    offset: anchorRect.left + viewRect.left - containerRect.left,
    size: anchorRect.width,
    mode: AnchorMode.ALIGN,
    position: forward ? AnchorPosition.After : AnchorPosition.Before,
  });
  const topOffset = calculateAnchorOffset(containerRect.height, 81, {
    offset: anchorRect.top - (lineHeight - anchorRect.height) / 2,
    size: lineHeight,
    mode: AnchorMode.AVOID,
    position: forward ? AnchorPosition.Before : AnchorPosition.After,
  });
  return {
    leftOffset,
    topOffset,
  };
};

export default useSelectionMenuOffset;
