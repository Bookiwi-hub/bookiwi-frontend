import { KeyboardEvent } from "react";

import { useAtom } from "@bookiwi/jotai";

import { selectionAtom } from "../atoms";
import { useSelectionMenuOffset } from "../hooks";

import Overlay from "#/components/ui/overlay";

export default function TextSelectionMenu() {
  const [selectionAtomValue, setSelectionAtom] = useAtom(selectionAtom);
  const selection = selectionAtomValue?.selection;

  const offsets = useSelectionMenuOffset();

  if (!offsets) return null;

  const hide = () => {
    selection?.removeAllRanges();
    setSelectionAtom(null);
  };

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
          left: offsets.leftOffset,
          top: offsets.topOffset,
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
