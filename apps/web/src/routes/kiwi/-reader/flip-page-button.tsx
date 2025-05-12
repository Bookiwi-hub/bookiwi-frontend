import { ComponentProps, useCallback, useEffect } from "react";

import { Rendition } from "@bookiwi/epubjs";

import { useReader } from "./context";

import { useEventListener } from "#/hooks/use-event-listener";

function ReaderPrevPageButton(props: ComponentProps<"button">) {
  const { book } = useReader();
  const { children, ...rest } = props;

  const goToPrevPage = useCallback(() => {
    if (book && book.rendition) {
      book.rendition.prev();
    }
  }, [book]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
        goToPrevPage();
      }
    },
    [goToPrevPage],
  );

  useEffect(() => {
    if (!book) return;

    book.rendition.on("rendered", (r: Rendition, i: Window) => {
      const iframe = i.document;
      if (iframe) {
        iframe.addEventListener("keydown", handleKeyDown);
      }
    });
  }, [book, handleKeyDown]);

  useEventListener("keydown", handleKeyDown);

  return (
    <button
      type="button"
      {...rest}
      onClick={goToPrevPage}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

function ReaderNextPageButton(props: ComponentProps<"button">) {
  const { book } = useReader();
  const { children, ...rest } = props;

  const goToNextPage = useCallback(() => {
    if (book && book.rendition) {
      book.rendition.next();
    }
  }, [book]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code === "ArrowRight" || e.code === "ArrowDown") {
        goToNextPage();
      }
    },
    [goToNextPage],
  );

  useEffect(() => {
    if (!book) return;

    book.rendition.on("rendered", (r: Rendition, i: Window) => {
      const iframe = i.document;
      if (iframe) {
        iframe.addEventListener("keydown", handleKeyDown);
      }
    });
  }, [book, handleKeyDown]);

  useEventListener("keydown", handleKeyDown);

  return (
    <button
      type="button"
      {...rest}
      onClick={goToNextPage}
      onMouseDown={(e) => e.preventDefault()}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

export { ReaderPrevPageButton, ReaderNextPageButton };
