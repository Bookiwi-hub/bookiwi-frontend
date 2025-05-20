import IframeView from "@bookiwi/epubjs/types/managers/iframe";
import Section from "@bookiwi/epubjs/types/section";

import { useReading, useSettings } from "../contexts";
import { updateCustomStyle } from "../styles";

const useToggleProgressBar = () => {
  const { setProgressBarOpen } = useReading();
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
      setProgressBarOpen((prev) => !prev);
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

const useRendered = () => {
  const { setCurrentSection } = useReading();
  const addProgressBarToggleEvent = useToggleProgressBar();
  const { fontSize, fontFamily, fontWeight, lineHeight } = useSettings();

  const handleRendered = async (section: Section, iframeView: IframeView) => {
    const { contents } = iframeView;
    const iframe = contents.document;

    setCurrentSection(section);

    addProgressBarToggleEvent(iframe);

    await updateCustomStyle(contents, {
      fontSize,
      fontFamily,
      fontWeight,
      lineHeight,
    });
  };

  return handleRendered;
};

export default useRendered;
