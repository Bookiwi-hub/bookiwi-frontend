import { BookOpen } from "lucide-react";
import { useCallback, useRef, useEffect, useMemo } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";
import { useAtomValue } from "@bookiwi/jotai";

import { useVirtualizedToc } from "./hooks/useVirtualizedToc";
import { VirtualizedTocItem } from "./virtualized-toc-item";

import { bookAtom, currentSectionAtom } from "#/routes/kiwi/-reader/atoms";

interface VirtualizedTocProps {
  toc?: NavItem[]; // 직접 toc 전달 가능
  book?: any; // 직접 book 전달 가능
  currentHref?: string; // 현재 위치 직접 전달 가능
  onNavigate?: (href: string) => void; // 네비게이션 콜백

  // 기존 props
  containerHeight?: number;
  itemHeight?: number;
  className?: string;
  expandedByDefault?: boolean;
}

export function VirtualizedToc({
  toc: propToc,
  book: propBook,
  currentHref: propCurrentHref,
  onNavigate,
  containerHeight = 400,
  itemHeight = 40,
  className = "",
  expandedByDefault = false,
}: VirtualizedTocProps) {
  // 🎯 props 우선, 없으면 atom 사용 (EPUB 리더에서)
  const atomBook = useAtomValue(bookAtom);
  const atomCurrentSection = useAtomValue(currentSectionAtom);

  const book = propBook || atomBook;
  const toc = propToc || book?.navigation?.toc || [];

  // ✅ useMemo로 currentSection 메모이제이션
  const currentSection = useMemo(
    () => (propCurrentHref ? { href: propCurrentHref } : atomCurrentSection),
    [propCurrentHref, atomCurrentSection],
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, setScrollTop, toggleExpand, loadMoreItems } =
    useVirtualizedToc({
      toc,
      itemHeight,
      containerHeight,
      expandedByDefault,
    });

  // 목차 항목 클릭 핸들러
  const handleNavClick = useCallback(
    (href: string) => {
      if (onNavigate) {
        // 커스텀 네비게이션 콜백 사용
        onNavigate(href);
      } else if (book?.rendition) {
        // EPUB 리더 기본 네비게이션
        book.rendition.display(href);
      }
    },
    [book, onNavigate],
  );

  // 스크롤 핸들러
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      setScrollTop(target.scrollTop);

      // 무한 스크롤 트리거 (하단 근처에서)
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        loadMoreItems();
      }
    },
    [setScrollTop, loadMoreItems],
  );

  // 현재 섹션 자동 스크롤
  useEffect(() => {
    if (currentSection && scrollContainerRef.current) {
      const currentIndex = virtualItems.items.findIndex(
        (item) => item.href === currentSection.href,
      );

      if (currentIndex !== -1) {
        const targetScrollTop =
          (virtualItems.startIndex + currentIndex) * itemHeight;
        scrollContainerRef.current.scrollTop = targetScrollTop;
      }
    }
  }, [currentSection, virtualItems, itemHeight]);

  // 로딩 상태 (toc가 없을 때)
  if (!toc || toc.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <BookOpen className="mb-2 size-8 text-gray-400" />
        <p className="text-sm text-gray-600">목차를 불러오는 중입니다</p>
        <p className="text-xs text-gray-500">
          잠시만 기다려주세요. 또는 이 책에 목차가 없을 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {!propToc && <h3 className="mb-4 text-lg font-medium">목차</h3>}

      <div
        ref={scrollContainerRef}
        className="relative overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        {/* 전체 높이를 위한 컨테이너 */}
        <div style={{ height: virtualItems.totalHeight, position: "relative" }}>
          {/* 가상화된 아이템들 */}
          <div
            style={{
              transform: `translateY(${virtualItems.offsetY}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {virtualItems.items.map((item) => (
              <VirtualizedTocItem
                key={`${item.id || item.href}-${item.index}`}
                item={item}
                onNavigate={handleNavClick}
                onToggleExpand={toggleExpand}
                isActive={currentSection?.href === item.href}
                style={{
                  height: itemHeight,
                  display: "flex",
                  alignItems: "center",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {virtualItems.items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <BookOpen className="mb-2 size-8 text-gray-400" />
          <p className="text-sm text-gray-600">목차를 불러오는 중입니다</p>
          <p className="text-xs text-gray-500">
            잠시만 기다려주세요. 또는 이 책에 목차가 없을 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
