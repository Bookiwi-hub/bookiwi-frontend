import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { currentViewAtom, selectionAtom } from "../atoms";
import { isForwardSelection } from "../utils";

interface TextSelectionPosition {
  isReady: boolean;
  forward: boolean;
  anchorRect: DOMRect | null;
  lineHeight: number;
  containerRect: DOMRect | null;
  viewRect: DOMRect | null;
  hide: () => void;
}

export const useTextSelectionPosition = (): TextSelectionPosition => {
  const currentView = useAtomValue(currentViewAtom);
  const [selectionAtomValue, setSelectionAtom] = useAtom(selectionAtom);
  const selection = selectionAtomValue?.selection;

  const hide = () => {
    selection?.removeAllRanges();
    setSelectionAtom(null);
  };

  if (!currentView || !selection) {
    return {
      isReady: false,
      forward: false,
      anchorRect: null,
      lineHeight: 0,
      containerRect: null,
      viewRect: null,
      hide,
    };
  }

  const viewElement = currentView.element;
  const containerElement = viewElement.parentElement;

  if (!viewElement || !containerElement) {
    return {
      isReady: false,
      forward: false,
      anchorRect: null,
      lineHeight: 0,
      containerRect: null,
      viewRect: null,
      hide,
    };
  }

  const viewRect = viewElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  if (!containerRect || !viewRect) {
    return {
      isReady: false,
      forward: false,
      anchorRect: null,
      lineHeight: 0,
      containerRect: null,
      viewRect: null,
      hide,
    };
  }

  const forward = isForwardSelection(selection);
  const range = selection.getRangeAt(0);

  if (!range) {
    return {
      isReady: false,
      forward,
      anchorRect: null,
      lineHeight: 0,
      containerRect,
      viewRect,
      hide,
    };
  }

  const rects = [...range.getClientRects()].filter((r) => Math.round(r.width));
  const anchorRect = forward ? rects[rects.length - 1] : rects[0];
  const endContainer = forward ? range.endContainer : range.startContainer;

  if (!anchorRect || !endContainer) {
    return {
      isReady: false,
      forward,
      anchorRect: null,
      lineHeight: 0,
      containerRect,
      viewRect,
      hide,
    };
  }

  const currentLineHeight = parseFloat(
    getComputedStyle(endContainer.parentElement!).lineHeight,
  );
  const lineHeight = Number.isNaN(currentLineHeight)
    ? anchorRect.height
    : currentLineHeight;

  return {
    isReady: true,
    forward,
    anchorRect,
    lineHeight,
    containerRect,
    viewRect,
    hide,
  };
};
