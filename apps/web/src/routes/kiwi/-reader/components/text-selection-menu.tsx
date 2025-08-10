import { Bot, Highlighter, MessageSquare, Trash2 } from "lucide-react";
import { Children, KeyboardEvent, ReactNode, useState } from "react";

import { atom, useAtomValue, useSetAtom } from "@bookiwi/jotai";
import { NewHighlight } from "@bookiwi/supabase/types";

import { tabStateAtom, TabType } from "../../-split-view/annotation/atoms";
import {
  AnnotationPaneState,
  annotationPaneStateAtom,
  isAnnotationOpenAtom,
  isAnnotationPinnedAtom,
} from "../../-split-view/atoms";
import {
  addHighlightAtom,
  participantInfoAtom,
  kiwiIdAtom,
  removeHighlightAtom,
  selectedTextAtom,
} from "../atoms";
import { useSelectionMenu } from "../hooks";

import { Button } from "#/components/ui/button";
import Overlay from "#/components/ui/overlay";
import { cn } from "#/lib/utils";

const openHighlightTabAtom = atom(null, (get, set) => {
  const isAnnotationOpen = get(isAnnotationOpenAtom);
  if (!isAnnotationOpen) {
    set(annotationPaneStateAtom, AnnotationPaneState.OPEN);
  }
  set(tabStateAtom, TabType.COMMENT);
});

const openAiChatAtom = atom(null, (get, set) => {
  const isAnnotationOpen = get(isAnnotationOpenAtom);
  if (!isAnnotationOpen) {
    set(annotationPaneStateAtom, AnnotationPaneState.OPEN);
  }
  set(tabStateAtom, TabType.AI);
});

function TextSelectionMenu() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const participantInfo = useAtomValue(participantInfoAtom);
  const kiwiId = useAtomValue(kiwiIdAtom);
  const openHighlightTab = useSetAtom(openHighlightTabAtom);
  const openAiChat = useSetAtom(openAiChatAtom);
  const addHighlight = useSetAtom(addHighlightAtom);
  const removeHighlight = useSetAtom(removeHighlightAtom);
  const setSelectedText = useSetAtom(selectedTextAtom);
  const result = useSelectionMenu(width, height);
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);

  if (!result || !participantInfo || !kiwiId) {
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

  const addNewHighlight = async () => {
    const newHighlight: NewHighlight = {
      kiwiId,
      text: selectedText.text,
      cfi: selectedText.cfi,
      color: participantInfo.color,
      participantId: participantInfo.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sectionHref: selectedText.sectionHref,
    };
    await addHighlight(newHighlight);
  };

  const handleAddHighlight = async () => {
    await addNewHighlight();
    hide();
  };

  const handleComment = async () => {
    if (!selectedText.status.isAlreadyExists) {
      await addNewHighlight();
    }
    openHighlightTab();
    hide();
  };

  const handleRemoveHighlight = async () => {
    if (selectedText.id) {
      await removeHighlight(selectedText.id);
    }
    hide();
  };

  const handleAiChat = async () => {
    setSelectedText(selectedText.text);
    openAiChat();
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
    } else if (e.key === "i" && e.ctrlKey) {
      e.preventDefault();
      handleAiChat();
    }
  };

  const { isAlreadyExists, isMine } = selectedText.status;
  return (
    <>
      <Overlay className="!z-40 !bg-transparent" onClick={hide} />

      <div
        role="toolbar"
        ref={refFunc}
        className={cn(
          "absolute z-50 rounded-lg border border-border/50 bg-background/95 p-1 shadow-xl backdrop-blur-md",
          "animate-in fade-in-0 zoom-in-95 duration-150 focus:outline-none",
        )}
        style={{
          left: offsets.leftOffset,
          top: offsets.topOffset,
        }}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <ButtonGroup>
          {isAlreadyExists ? (
            isMine && (
              <SelectionMenuButton
                onClick={handleRemoveHighlight}
                title="하이라이트 삭제"
                label="삭제"
                shortcut="Ctrl+D"
                icon={<Trash2 className="size-3.5" />}
              />
            )
          ) : (
            <SelectionMenuButton
              onClick={handleAddHighlight}
              title="하이라이트 (Ctrl+H)"
              label="하이라이트"
              shortcut="Ctrl+H"
              icon={
                <Highlighter
                  className="size-3.5"
                  strokeWidth={4}
                  style={{
                    color: participantInfo.color || "rgba(186, 230, 55)",
                  }}
                />
              }
            />
          )}

          {!isAnnotationPinned && (
            <SelectionMenuButton
              onClick={handleComment}
              title="코멘트 (Ctrl+M)"
              label="코멘트"
              shortcut="Ctrl+M"
              icon={<MessageSquare className="size-3.5 text-blue-600" />}
            />
          )}

          {(!isAlreadyExists || !isMine) && (
            <SelectionMenuButton
              onClick={handleAiChat}
              title="AI 채팅 (Ctrl+I)"
              label="AI 채팅"
              shortcut="Ctrl+I"
              icon={<Bot className="size-3.5" />}
            />
          )}
        </ButtonGroup>
      </div>
    </>
  );
}

function SelectionMenuButton({
  onClick,
  title,
  label,
  shortcut,
  icon,
}: {
  onClick: () => void;
  title: string;
  label: string;
  shortcut?: string;
  icon: ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="flex h-8 justify-between px-2 text-xs"
      title={title}
    >
      {icon}
      <span className="ml-1.5 text-muted-foreground">{label}</span>
      {shortcut && (
        <span className="ml-1 text-[10px] text-muted-foreground/60">
          {shortcut}
        </span>
      )}
    </Button>
  );
}

function ButtonGroup({ children }: { children: ReactNode }) {
  const childList = Children.toArray(children);
  if (!childList.length) return null;
  return (
    <div className="flex flex-col items-stretch gap-1">
      {childList.reduce((prevButtons, currentButton) => (
        <>
          {prevButtons}
          <div className="h-px w-full bg-border/50" />
          {currentButton}
        </>
      ))}
    </div>
  );
}

export default TextSelectionMenu;
