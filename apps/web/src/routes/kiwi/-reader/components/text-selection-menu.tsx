import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { currentViewAtom, selectionAtom } from "../atoms";
import { isForwardSelection } from "../utils";
import {
  AnchorMode,
  AnchorPosition,
  calculateAnchorOffset,
} from "../utils/anchor";

import Overlay from "#/components/ui/overlay";

export default function TextSelectionMenu() {
  const currentView = useAtomValue(currentViewAtom);
  const [selectionAtomValue, setSelectionAtom] = useAtom(selectionAtom);
  const selection = selectionAtomValue?.selection;

  if (!currentView || !selection) return null;

  const epubjsView = currentView.element;
  const epubjsContainer = epubjsView.parentElement!;

  const containerRect = epubjsContainer.getBoundingClientRect();
  const viewRect = epubjsView.getBoundingClientRect();

  if (!containerRect || !viewRect) return null;

  const forward = isForwardSelection(selection);
  const range = selection.getRangeAt(0);
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
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={setSelectionMenuSize}
        className="absolute z-30 size-10 bg-red-500"
        style={{
          // 메뉴 위치 계산 - 가로 위치 (부모 컨테이너 기반으로 상대 좌표를 사용 **중요)
          left: calculateAnchorOffset(containerRect.width, 10, {
            offset: anchorRect.left + viewRect.left - containerRect.left,
            size: anchorRect.width,
            mode: AnchorMode.ALIGN,
            position: forward ? AnchorPosition.Before : AnchorPosition.After,
          }),
          // 메뉴 위치 계산 - 세로 위치
          top: calculateAnchorOffset(containerRect.height, 10, {
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
      />
    </>
  );
}
