import { Highlighter, MessageSquare, Trash2 } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import { useAtom, useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  isAnnotationOpenAtom,
  openAnnotationPaneAtom,
} from "../../-split-view/atoms";
import {
  currentSectionAtom,
  participantColorAtom,
  participantIdAtom,
  participantKiwiIdAtom,
  selectionAtom,
  addAnnotationAtom,
  annotationsAtom,
} from "../atoms";
import { useSelectionMenuOffset } from "../hooks";

import { Button } from "#/components/ui/button";
import Overlay from "#/components/ui/overlay";
import { cn } from "#/lib/utils";
import { AnnotationIDBData } from "#/types/idb";

function TextSelectionMenu() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selection, setSelection] = useAtom(selectionAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const participantColor = useAtomValue(participantColorAtom);
  const participantId = useAtomValue(participantIdAtom);
  const kiwiId = useAtomValue(participantKiwiIdAtom);
  const isAnnotationOpen = useAtomValue(isAnnotationOpenAtom);
  const openAnnotationPane = useSetAtom(openAnnotationPaneAtom);
  const annotations = useAtomValue(annotationsAtom);
  const addAnnotation = useSetAtom(addAnnotationAtom);

  const offsets = useSelectionMenuOffset(width, height);

  if (
    !offsets ||
    !selection ||
    !currentSection ||
    !kiwiId ||
    !participantId ||
    !participantColor
  )
    return null;

  const hide = () => {
    selection.removeAllRanges();
    setSelection(null);
  };

  const refFunc = (el: HTMLDivElement) => {
    if (!el) return;
    setWidth(el.clientWidth);
    setHeight(el.clientHeight);
    el.focus();
  };

  const textRange = selection.getRangeAt(0);
  const textCfi = currentSection.cfiFromRange(textRange);
  const existingAnnotation = annotations.find((a) => a.cfi === textCfi);

  const addHighlight = () => {
    const newAnnotation: AnnotationIDBData = {
      id: `${participantId}-${textCfi}`,
      kiwiId,
      text: selection.toString(),
      cfi: textCfi,
      color: participantColor,
      participantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sectionIndex: currentSection.index,
      comments: [],
    };
    addAnnotation(newAnnotation);
  };

  const handleAddHighlight = () => {
    addHighlight();
    hide();
  };

  const handleComment = () => {
    if (
      !existingAnnotation ||
      existingAnnotation.participantId !== participantId
    ) {
      addHighlight();
    }
    if (!isAnnotationOpen) {
      openAnnotationPane();
    }
    hide();
  };

  const handleRemoveHighlight = () => {
    hide();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      hide();
    } else if (e.key === "h" && e.ctrlKey) {
      e.preventDefault();
      handleAddHighlight();
    } else if (e.key === "m" && e.ctrlKey) {
      e.preventDefault();
      handleComment();
    }
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
        {existingAnnotation &&
        existingAnnotation.participantId === participantId ? (
          <RemoveHighlightButton onClick={handleRemoveHighlight} />
        ) : (
          <AddHighlightButton
            participantColor={participantColor}
            onClick={handleAddHighlight}
          />
        )}

        <div className="h-px w-full bg-border/50" />

        <CommentButton onClick={handleComment} />
      </div>
    </>
  );
}

function AddHighlightButton({
  participantColor,
  onClick,
}: {
  participantColor: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="flex h-8 justify-between px-2 text-xs"
      title="하이라이트 (Ctrl+H)"
    >
      <Highlighter
        className="size-3.5"
        strokeWidth={4}
        style={{
          color: participantColor || "rgba(186, 230, 55)",
        }}
      />
      <span className="ml-1.5 text-muted-foreground">하이라이트</span>
      <span className="ml-1 text-[10px] text-muted-foreground/60">Ctrl+H</span>
    </Button>
  );
}

function RemoveHighlightButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="flex h-8 justify-between px-2 text-xs"
      title="하이라이트 삭제"
    >
      <Trash2 className="size-3.5" />
      <span className="ml-1.5 text-muted-foreground">삭제</span>
      <span className="ml-1 text-[10px] text-muted-foreground/60">Ctrl+H</span>
    </Button>
  );
}

function CommentButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="flex h-8 justify-between px-2 text-xs"
      title="코멘트 (Ctrl+M)"
    >
      <MessageSquare className="size-3.5 text-blue-600" />
      <span className="ml-1.5 text-muted-foreground">코멘트</span>
      <span className="ml-1 text-[10px] text-muted-foreground/60">Ctrl+M</span>
    </Button>
  );
}

export default TextSelectionMenu;
