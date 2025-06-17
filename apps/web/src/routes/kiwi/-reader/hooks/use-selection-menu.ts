import IframeView from "@bookiwi/epubjs/types/managers/iframe";
import { useAtom, useAtomValue } from "@bookiwi/jotai";

import {
  annotationsAtom,
  currentSectionAtom,
  currentViewAtom,
  highlightClickedAtom,
  participantIdAtom,
  participantKiwiIdAtom,
  selectedAnnotationAtom,
  selectionAtom,
} from "../atoms";
import {
  AnchorMode,
  AnchorPosition,
  calculateAnchorOffset,
  isForwardSelection,
} from "../utils";

interface TextSelection {
  id: string;
  text: string;
  cfi: string;
  range: Range;
  isForward: boolean;
  status: { isAlreadyExists: boolean; isMine: boolean };
  sectionHref: string;
  remove: () => void;
}

interface TextSelectionPosition {
  leftOffset: number;
  topOffset: number;
}

interface SelectionMenu {
  offsets: TextSelectionPosition;
  selectedText: TextSelection;
}

export const useSelectedText = (): TextSelection | null => {
  const currentSection = useAtomValue(currentSectionAtom);
  const [selection, setSelection] = useAtom(selectionAtom);
  const [highlightClicked, setHighlightClicked] = useAtom(highlightClickedAtom);
  const selectedAnnotation = useAtomValue(selectedAnnotationAtom);
  const participantId = useAtomValue(participantIdAtom);
  const kiwiId = useAtomValue(participantKiwiIdAtom);
  const currentView = useAtomValue(currentViewAtom);
  const annotations = useAtomValue(annotationsAtom);
  if (!currentSection || !currentView) {
    return null;
  }

  if (selection) {
    const range = selection.getRangeAt(0);
    const text = range.toString();
    const cfi = currentSection.cfiFromRange(range);
    const isForward = isForwardSelection(selection);
    const existingHighlight = annotations.find(
      (a) => a.cfi === cfi && a.participantId === participantId,
    );
    const isMine = existingHighlight?.participantId === participantId;

    const remove = () => {
      selection.removeAllRanges();
      setSelection(null);
      setHighlightClicked(false);
    };

    return {
      id: existingHighlight
        ? existingHighlight.id
        : `${kiwiId}-${participantId}-${cfi}`,
      text,
      cfi,
      range,
      isForward,
      status: {
        isAlreadyExists: !!existingHighlight,
        isMine,
      },
      sectionHref: currentSection.href,
      remove,
    };
  }

  if (highlightClicked && selectedAnnotation) {
    const remove = () => {
      setHighlightClicked(false);
    };

    return {
      id: selectedAnnotation.id,
      text: selectedAnnotation.text,
      cfi: selectedAnnotation.cfi,
      range: currentView.contents.range(selectedAnnotation.cfi),
      isForward: true,
      status: {
        isAlreadyExists: true,
        isMine: selectedAnnotation.participantId === participantId,
      },
      sectionHref: selectedAnnotation.sectionHref,
      remove,
    };
  }

  return null;
};

export const getSelectionMenuOffset = (
  menuWidth: number,
  menuHeight: number,
  currentView: IframeView,
  range: Range,
  isForward: boolean,
): TextSelectionPosition | null => {
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

  const rects = [...range.getClientRects()].filter((r) => Math.round(r.width));
  const anchorRect = isForward ? rects[rects.length - 1] : rects[0];
  const endContainer = isForward ? range.endContainer : range.startContainer;

  if (!anchorRect || !endContainer) {
    return null;
  }

  const currentLineHeight = parseFloat(
    getComputedStyle(endContainer.parentElement!).lineHeight,
  );
  const lineHeight = Number.isNaN(currentLineHeight)
    ? anchorRect.height
    : currentLineHeight;

  const leftOffset = calculateAnchorOffset(containerRect.width, menuWidth, {
    offset: anchorRect.left + viewRect.left - containerRect.left,
    size: anchorRect.width,
    mode: AnchorMode.ALIGN,
    position: isForward ? AnchorPosition.After : AnchorPosition.Before,
  });
  const topOffset = calculateAnchorOffset(containerRect.height, menuHeight, {
    offset: anchorRect.top - (lineHeight - anchorRect.height) / 2,
    size: lineHeight,
    mode: AnchorMode.AVOID,
    position: isForward ? AnchorPosition.Before : AnchorPosition.After,
  });
  return {
    leftOffset,
    topOffset,
  };
};

export const useSelectionMenu = (
  menuWidth: number,
  menuHeight: number,
): SelectionMenu | null => {
  const selectedText = useSelectedText();
  const currentView = useAtomValue(currentViewAtom);
  if (!selectedText || !currentView) {
    return null;
  }
  const offsets = getSelectionMenuOffset(
    menuWidth,
    menuHeight,
    currentView,
    selectedText.range,
    selectedText.isForward,
  );

  if (!offsets) {
    return null;
  }

  return {
    offsets,
    selectedText,
  };
};
