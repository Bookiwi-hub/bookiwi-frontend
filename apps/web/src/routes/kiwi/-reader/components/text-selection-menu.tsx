import { Highlighter, MessageSquare } from "lucide-react";
import { KeyboardEvent } from "react";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { participantColorAtom, selectionAtom } from "../atoms";
import { useSelectionMenuOffset } from "../hooks";

import { Button } from "#/components/ui/button";
import Overlay from "#/components/ui/overlay";
import { cn } from "#/lib/utils";

export default function TextSelectionMenu() {
  const [selection, setSelection] = useAtom(selectionAtom);
  const participantColor = useAtomValue(participantColorAtom);

  const offsets = useSelectionMenuOffset();

  if (!offsets) return null;

  const hide = () => {
    selection?.removeAllRanges();
    setSelection(null);
  };

  const refFunc = (el: HTMLDivElement) => {
    if (!el) return;
    el.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      hide();
    } else if (e.key === "h" && e.ctrlKey) {
      e.preventDefault();
      handleHighlight();
    } else if (e.key === "m" && e.ctrlKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const getSelectedText = () => selection?.toString() || "";

  const handleHighlight = () => {
    const text = getSelectedText();
    // TODO: 하이라이트 기능 구현
    console.log("Highlight:", text);
    hide();
  };

  const handleAddNote = () => {
    const text = getSelectedText();
    // TODO: 메모 추가 기능 구현
    console.log("Add Note:", text);
    hide();
  };

  return (
    <>
      <Overlay className="!z-20 !bg-transparent" onClick={hide} />

      <div
        role="toolbar"
        ref={refFunc}
        className={cn(
          "absolute z-30 flex flex-col items-stretch gap-1 rounded-lg border border-border/50 bg-background/95 p-1 shadow-xl backdrop-blur-md",
          "animate-in fade-in-0 zoom-in-95 duration-150 focus:outline-none",
        )}
        style={{
          left: offsets.leftOffset,
          top: offsets.topOffset,
        }}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHighlight}
          className="flex h-8 justify-between px-2 text-xs"
          title="하이라이트 (Ctrl+H)"
        >
          <Highlighter
            className="size-3.5"
            style={{
              color: participantColor || undefined,
            }}
          />
          <span className="ml-1.5 text-muted-foreground">하이라이트</span>
          <span className="ml-1 text-[10px] text-muted-foreground/60">
            Ctrl+H
          </span>
        </Button>

        <div className="h-px w-full bg-border/50" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddNote}
          className="flex h-8 justify-between px-2 text-xs"
          title="메모 추가 (Ctrl+M)"
        >
          <MessageSquare className="size-3.5 text-blue-600" />
          <span className="ml-1.5 text-muted-foreground">코멘트</span>
          <span className="ml-1 text-[10px] text-muted-foreground/60">
            Ctrl+M
          </span>
        </Button>
      </div>
    </>
  );
}
