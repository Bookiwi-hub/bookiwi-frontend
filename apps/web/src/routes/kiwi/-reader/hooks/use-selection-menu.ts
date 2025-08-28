import IframeView from "@bookiwi/epubjs/types/managers/iframe";
import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { isAnnotationPinnedAtom } from "../../-split-view/atoms";
import {
  currentSectionAtom,
  currentViewAtom,
  highlightClickedAtom,
  participantIdAtom,
  selectedHighlightAtom,
  selectionAtom,
  highlightsAtom,
  currentCfiAtom,
} from "../atoms";
import {
  AnchorMode,
  AnchorPosition,
  calculateAnchorOffset,
  hasCfiPassed,
  isForwardSelection,
  createCfiFromSelectionToPageEnd,
  createRangeFromCfi,
} from "../utils";

interface TextSelection {
  id: string | null;
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
  const selectedHighlight = useAtomValue(selectedHighlightAtom);
  const participantId = useAtomValue(participantIdAtom);
  const currentView = useAtomValue(currentViewAtom);
  const highlights = useAtomValue(highlightsAtom);
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);
  const currentCfi = useAtomValue(currentCfiAtom);
  if (!currentSection || !currentView || !currentCfi) {
    return null;
  }

  if (selection) {
    const selectedRange = selection.getRangeAt(0);
    const selectedText = selectedRange.toString();
    const selectedCfi = currentSection.cfiFromRange(selectedRange);
    const isForward = isForwardSelection(selection);
    const existingHighlight = highlights.find((a) => a.cfi === selectedCfi);
    const isMine = existingHighlight?.participantId === participantId;

    let cfi: string;
    let range: Range;
    let text: string;

    if (hasCfiPassed(selectedCfi, currentCfi.end)) {
      // 선택 영역이 현재 페이지를 벗어난 경우
      cfi = createCfiFromSelectionToPageEnd(selectedCfi, currentCfi.end);

      // 새로운 CFI로부터 Range 생성
      const newRange = createRangeFromCfi(cfi, currentView);
      if (newRange) {
        range = newRange;
        text = newRange.toString();
      } else {
        // Range 생성에 실패한 경우 원본 사용
        range = selectedRange;
        text = selectedText;
      }
    } else {
      // 선택 영역이 현재 페이지 내에 있는 경우
      cfi = selectedCfi;
      range = selectedRange;
      text = selectedText;
    }

    const remove = () => {
      selection.removeAllRanges();
      setSelection(null);
      setHighlightClicked(false);
    };

    return {
      id: existingHighlight ? existingHighlight.id : null,
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

  if (highlightClicked && selectedHighlight && !isAnnotationPinned) {
    const remove = () => {
      setHighlightClicked(false);
    };

    return {
      id: selectedHighlight.id,
      text: selectedHighlight.text,
      cfi: selectedHighlight.cfi,
      range: currentView.contents.range(selectedHighlight.cfi),
      isForward: true,
      status: {
        isAlreadyExists: true,
        isMine: selectedHighlight.participantId === participantId,
      },
      sectionHref: selectedHighlight.sectionHref,
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
