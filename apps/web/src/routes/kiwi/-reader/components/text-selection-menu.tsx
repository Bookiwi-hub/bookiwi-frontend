import { Highlighter, MessageSquare, Trash2 } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import { atom, useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  isAnnotationOpenAtom,
  openAnnotationPaneAtom,
} from "../../-split-view/atoms";
import {
  participantColorAtom,
  participantIdAtom,
  participantKiwiIdAtom,
  addAnnotationAtom,
  removeAnnotationAtom,
  selectedAnnotationAtom,
} from "../atoms";
import { useSelectionMenu } from "../hooks";

import { Button } from "#/components/ui/button";
import Overlay from "#/components/ui/overlay";
import { cn } from "#/lib/utils";
import { AnnotationIDBData } from "#/types/idb";

const participantInfoAtom = atom((get) => ({
  participantId: get(participantIdAtom),
  kiwiId: get(participantKiwiIdAtom),
  color: get(participantColorAtom),
}));

function TextSelectionMenu() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { participantId, kiwiId, color } = useAtomValue(participantInfoAtom);
  const isAnnotationOpen = useAtomValue(isAnnotationOpenAtom);
  const openAnnotationPane = useSetAtom(openAnnotationPaneAtom);
  const addAnnotation = useSetAtom(addAnnotationAtom);
  const removeAnnotation = useSetAtom(removeAnnotationAtom);
  const setSelectedAnnotation = useSetAtom(selectedAnnotationAtom);
  const result = useSelectionMenu(width, height);

  if (!result || !kiwiId || !participantId || !color) {
    return null;
  }
  const { offsets, selectedText } = result;

  const hide = () => {
    selectedText.remove();
  };

  const refFunc = (el: HTMLDivElement) => {
    if (!el) return;
    setWidth(el.clientWidth);
    setHeight(el.clientHeight);
    el.focus();
  };

  const addHighlight = () => {
    const newAnnotation: AnnotationIDBData = {
      id: selectedText.id,
      kiwiId,
      text: selectedText.text,
      cfi: selectedText.cfi,
      color,
      participantId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sectionIndex: selectedText.sectionIndex,
      comments: [],
    };
    addAnnotation(newAnnotation);
    return newAnnotation;
  };

  const handleAddHighlight = () => {
    addHighlight();
    hide();
  };

  const handleComment = () => {
    if (!selectedText.status.isAlreadyExists) {
      const newAnnotation = addHighlight();
      setSelectedAnnotation(newAnnotation);
    }
    if (!isAnnotationOpen) {
      openAnnotationPane();
    }
    hide();
  };

  const handleRemoveHighlight = () => {
    removeAnnotation(selectedText.id);
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
    } else if (e.key === "d" && e.ctrlKey) {
      e.preventDefault();
      handleRemoveHighlight();
    }
  };

  const { isAlreadyExists, isMine } = selectedText.status;
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
        {isAlreadyExists ? (
          isMine && <RemoveHighlightButton onClick={handleRemoveHighlight} />
        ) : (
          <AddHighlightButton
            participantColor={color}
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
      <span className="ml-1 text-[10px] text-muted-foreground/60">Ctrl+D</span>
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
