import { useCallback, ComponentPropsWithoutRef, useRef } from "react";

import { Location } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

import { useBook } from "./book-context";
import { useReading } from "./reading-context";
import { useRecord } from "./record-context";
import { useSettings } from "./settings-context";
import { defaultStyle, updateCustomStyle } from "./styles";

import { debounce } from "#/utils/debounce";

function ReaderContents(props: ComponentPropsWithoutRef<"div">) {
  const { book } = useBook();
  const { isSinglePage, fontSize, fontFamily, fontWeight, lineHeight } =
    useSettings();
  const { currentCfi, setCurrentCfi } = useRecord();
  const { setCurrentLocation, setCurrentSection } = useReading();
  const prevSize = useRef(0);
  const resizeRef = useRef<(() => void) | null>(null);

  const setViewerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return () => {};

      // rendition 객체 생성
      const rendition = book.renderTo(node, {
        width: "100%",
        height: "100%",
        allowScriptedContent: true, // 자바스크립트 실행 허용
        spread: isSinglePage ? "none" : "auto",
      });
      // 책 렌더링
      rendition.display(currentCfi || undefined);

      // 키보드 이벤트 처리
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "ArrowRight" || e.code === "ArrowDown") {
          rendition.next();
        } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
          rendition.prev();
        }
      };
      globalThis.addEventListener("keydown", handleKeyDown);
      rendition.on("keydown", handleKeyDown);

      // 기본 스타일 적용
      rendition.themes.default(defaultStyle);
      rendition.on("relocated", (location: Location) => {
        const { cfi } = location.start;
        setCurrentCfi(cfi);
        setCurrentLocation(location);
      });

      rendition.on("rendered", async (section: Section) => {
        setCurrentSection(section);
        const contents = rendition.getContents()[0];
        if (contents) {
          await updateCustomStyle(contents, {
            fontSize,
            fontFamily,
            fontWeight,
            lineHeight,
          });
        }
      });

      const handleResize = debounce(() => {
        rendition.resize();
      }, 200);

      resizeRef.current = handleResize;

      const observer = new ResizeObserver(([e]) => {
        const size = e?.contentRect.width ?? 0;

        if (size !== 0 && prevSize.current !== 0 && size !== prevSize.current) {
          handleResize();
        }

        prevSize.current = size;
      });

      observer.observe(node);

      return () => {
        observer.disconnect();
        globalThis.removeEventListener("keydown", handleKeyDown);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [book],
  );

  return <div ref={setViewerRef} {...props} />;
}

export default ReaderContents;
