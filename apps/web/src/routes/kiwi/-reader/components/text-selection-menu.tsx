import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { currentViewAtom, selectionAtom } from "../atoms";
import {
  AnchorMode,
  AnchorPosition,
  calculateAnchorOffset,
  isForwardSelection,
} from "../utils";

import Overlay from "#/components/ui/overlay";

export default function TextSelectionMenu() {
  const currentView = useAtomValue(currentViewAtom);
  const [selectionAtomValue, setSelectionAtom] = useAtom(selectionAtom);
  const selection = selectionAtomValue?.selection;

  if (!currentView || !selection) return null;

  const viewElement = currentView.element;
  const containerElement = viewElement.parentElement;
  if (!viewElement || !containerElement) return null;

  const viewRect = viewElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();
  if (!containerRect || !viewRect) return null;

  const forward = isForwardSelection(selection);
  const range = selection.getRangeAt(0);

  if (!range) return null;

  const rects = [...range.getClientRects()].filter((r) => Math.round(r.width));
  const anchorRect = forward ? rects[rects.length - 1] : rects[0];

  if (!anchorRect) return null;
  const endContainer = forward ? range.endContainer : range.startContainer;

  const currentLineHeight = parseFloat(
    getComputedStyle(endContainer.parentElement!).lineHeight,
  );
  const lineHeight = Number.isNaN(currentLineHeight)
    ? anchorRect.height
    : currentLineHeight;

  const setSelectionMenuSize = (el: HTMLDivElement) => {
    if (!el) return;
    el.focus();
  };

  const hide = () => {
    selection.removeAllRanges();
    setSelectionAtom(null);
  };

  return (
    <>
      <Overlay className="!z-20 !bg-transparent" onClick={hide} />

      <div
        role="toolbar"
        ref={setSelectionMenuSize}
        className="absolute z-30 size-20 bg-red-500"
        style={{
          left: calculateAnchorOffset(containerRect.width, 80, {
            offset: anchorRect.left + viewRect.left - containerRect.left,
            size: anchorRect.width,
            mode: AnchorMode.ALIGN,
            position: forward ? AnchorPosition.After : AnchorPosition.Before,
          }),
          top: calculateAnchorOffset(containerRect.height, 80, {
            offset: anchorRect.top - (lineHeight - anchorRect.height) / 2,
            size: lineHeight,
            mode: AnchorMode.AVOID,
            position: forward ? AnchorPosition.Before : AnchorPosition.After,
          }),
        }}
        tabIndex={-1}
        // 키보드 단축키 처리 (Ctrl+C)
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "c" && e.ctrlKey) {
            //   copy(text);
          }
        }}
      >
        Text Selection Menu
      </div>
    </>
  );
}
