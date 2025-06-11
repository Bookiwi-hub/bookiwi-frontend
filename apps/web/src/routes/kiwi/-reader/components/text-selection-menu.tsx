import { KeyboardEvent } from "react";

import { useTextSelectionPosition } from "../hooks";
import { AnchorMode, AnchorPosition, calculateAnchorOffset } from "../utils";

import Overlay from "#/components/ui/overlay";

export default function TextSelectionMenu() {
  const {
    isReady,
    forward,
    anchorRect,
    lineHeight,
    containerRect,
    viewRect,
    hide,
  } = useTextSelectionPosition();

  if (!isReady || !anchorRect || !containerRect || !viewRect) return null;

  const refFunc = (el: HTMLDivElement) => {
    if (!el) return;
    el.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === "c" && e.ctrlKey) {
      //   copy(text);
    }
  };

  return (
    <>
      <Overlay className="!z-20 !bg-transparent" onClick={hide} />

      <div
        role="toolbar"
        ref={refFunc}
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
        onKeyDown={handleKeyDown}
      >
        Text Selection Menu
      </div>
    </>
  );
}
