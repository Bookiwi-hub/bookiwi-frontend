import { useEffect } from "react";

import IframeView from "@bookiwi/epubjs/types/managers/iframe";
import Section from "@bookiwi/epubjs/types/section";
import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  bookAtom,
  currentSectionAtom,
  currentViewAtom,
  selectionAtom,
  toggleCenterTouchedAtom,
  typographyAtom,
} from "../atoms";
import { hasSelection, updateCustomStyle } from "../utils";

const useToggleProgressBar = () => {
  const toggleProgressBar = useSetAtom(toggleCenterTouchedAtom);

  const handleTouchAndClick = () => {
    toggleProgressBar();
  };

  const addProgressBarToggleEvent = (iframe: Document) => {
    iframe.addEventListener("click", handleTouchAndClick);
  };

  return addProgressBarToggleEvent;
};

const useUpdateCustomStyle = () => {
  const book = useAtomValue(bookAtom);
  const typography = useAtomValue(typographyAtom);

  useEffect(() => {
    const handleRendered = async () => {
      const contents = book?.rendition.getContents()[0];
      if (!contents) return;
      await updateCustomStyle(contents, typography);
    };

    book?.rendition?.on("rendered", handleRendered);

    return () => {
      book?.rendition?.off("rendered", handleRendered);
    };
  }, [typography, book]);
};

const useTextSelect = () => {
  const setSelection = useSetAtom(selectionAtom);

  const addTextSelectEvent = (iframe: Document) => {
    iframe.addEventListener("mouseup", () => {
      const selection = iframe.getSelection();
      if (hasSelection(selection)) {
        setSelection(selection);
      } else {
        setSelection(null);
      }
    });
  };

  return addTextSelectEvent;
};

const useRendered = () => {
  const setCurrentSection = useSetAtom(currentSectionAtom);
  const setCurrentView = useSetAtom(currentViewAtom);
  const addProgressBarToggleEvent = useToggleProgressBar();
  const addTextSelectEvent = useTextSelect();

  useUpdateCustomStyle();

  const handleRendered = (section: Section, iframeView: IframeView) => {
    const { contents } = iframeView;
    const iframe = contents.document;

    setCurrentView(iframeView);
    setCurrentSection(section);

    addProgressBarToggleEvent(iframe);
    addTextSelectEvent(iframe);
  };

  return handleRendered;
};

export default useRendered;
