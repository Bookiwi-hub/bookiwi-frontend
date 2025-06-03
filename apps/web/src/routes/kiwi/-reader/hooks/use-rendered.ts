import { useEffect } from "react";

import IframeView from "@bookiwi/epubjs/types/managers/iframe";
import Section from "@bookiwi/epubjs/types/section";
import {
  currentSectionAtom,
  toggleProgressBarAtom,
  useSetAtom,
} from "@bookiwi/jotai";

import { useBook, useSettings } from "../contexts";
import { updateCustomStyle } from "../styles";

const useToggleProgressBar = () => {
  const toggleProgressBar = useSetAtom(toggleProgressBarAtom);
  // Track if user is dragging
  let isDragging = false;
  const handleMouseDown = () => {
    isDragging = false;
  };
  const handleMouseMove = () => {
    isDragging = true;
  };
  const handleTouchStart = () => {
    isDragging = false;
  };
  const handleTouchMove = () => {
    isDragging = true;
  };

  const handleTouchAndClick = (e: MouseEvent | TouchEvent) => {
    // Check if there's any text selected
    const target = e.currentTarget as Document;
    const selection = target.getSelection();

    // Only toggle if not dragging and no text is selected
    if (!isDragging && (!selection || selection.toString().trim() === "")) {
      toggleProgressBar();
    }

    // Reset the dragging state
    isDragging = false;
  };

  const addProgressBarToggleEvent = (iframe: Document) => {
    iframe.addEventListener("click", handleTouchAndClick);

    // Add drag detection events
    iframe.addEventListener("mousedown", handleMouseDown);
    iframe.addEventListener("mousemove", handleMouseMove);
    iframe.addEventListener("touchstart", handleTouchStart);
    iframe.addEventListener("touchmove", handleTouchMove);
  };

  return addProgressBarToggleEvent;
};

const useUpdateCustomStyle = () => {
  const { book } = useBook();
  const { fontSize, fontFamily, fontWeight, lineHeight } = useSettings();

  useEffect(() => {
    const handleRendered = async () => {
      const contents = book?.rendition.getContents()[0];
      if (!contents) return;
      await updateCustomStyle(contents, {
        fontSize,
        fontFamily,
        fontWeight,
        lineHeight,
      });
    };

    book?.rendition?.on("rendered", handleRendered);

    return () => {
      book?.rendition?.off("rendered", handleRendered);
    };
  }, [fontSize, fontFamily, fontWeight, lineHeight, book]);
};

const useRendered = () => {
  const setCurrentSection = useSetAtom(currentSectionAtom);
  const addProgressBarToggleEvent = useToggleProgressBar();

  useUpdateCustomStyle();

  const handleRendered = (section: Section, iframeView: IframeView) => {
    const { contents } = iframeView;
    const iframe = contents.document;

    setCurrentSection(section);

    addProgressBarToggleEvent(iframe);
  };

  return handleRendered;
};

export default useRendered;
