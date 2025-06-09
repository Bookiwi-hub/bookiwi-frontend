import { BookOpen, Book, ChevronRight, ChevronDown } from "lucide-react";
import { useCallback, useRef, useEffect, useMemo } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";
import { useAtomValue } from "@bookiwi/jotai";

import { useVirtualizedToc } from "./hooks/useVirtualizedToc";
import { VirtualizedTocItem } from "./virtualized-toc-item";

import { bookAtom, currentSectionAtom } from "#/routes/kiwi/-reader/atoms";

interface VirtualizedTocProps {
  // 🎯 데이터 관련
  toc?: NavItem[];
  book?: any;
  currentHref?: string;
  onNavigate?: (href: string) => void;

  // 🎯 UI 설정
  containerHeight?: number;
  maxHeight?: number; // SimpleVirtualizedToc 호환성을 위해 추가
  itemHeight?: number;
  className?: string;
  expandedByDefault?: boolean;

  // 🎯 렌더링 모드
  variant?: "full" | "simple"; // full: VirtualizedTocItem 사용, simple: 인라인 렌더링
  showTitle?: boolean; // 제목 표시 여부
  showNumbering?: boolean; // 번호 표시 여부
}

export function VirtualizedToc({
  toc: propToc,
  book: propBook,
  currentHref: propCurrentHref,
  onNavigate,
  containerHeight,
  maxHeight,
  itemHeight = 40,
  className = "",
  expandedByDefault = false,
  variant = "full",
  showTitle = true,
  showNumbering = true,
}: VirtualizedTocProps) {
  // 🎯 높이 설정 (maxHeight 우선, 없으면 containerHeight)
  const finalHeight = maxHeight || containerHeight || 400;

  // 🎯 Atom 데이터 (variant가 "full"일 때만)
  const atomBook = useAtomValue(bookAtom);
  const atomCurrentSection = useAtomValue(currentSectionAtom);

  const book = propBook || (variant === "full" ? atomBook : null);
  const toc = propToc || book?.navigation?.toc || [];

  // 🎯 현재 섹션 메모이제이션 (variant가 "full"일 때만)
  const currentSection = useMemo(() => {
    if (variant === "simple") return null;
    return propCurrentHref ? { href: propCurrentHref } : atomCurrentSection;
  }, [propCurrentHref, atomCurrentSection, variant]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, setScrollTop, toggleExpand, loadMoreItems } =
    useVirtualizedToc({
      toc,
      itemHeight,
      containerHeight: finalHeight,
      expandedByDefault,
    });

  // 🎯 통합된 네비게이션 핸들러
  const handleNavClick = useCallback(
    (href: string) => {
      if (onNavigate) {
        onNavigate(href);
      } else if (book?.rendition) {
        book.rendition.display(href);
      }
    },
    [book, onNavigate],
  );

  // 🎯 통합된 스크롤 핸들러
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      setScrollTop(target.scrollTop);

      // 무한 스크롤 (variant가 "full"일 때만)
      if (variant === "full") {
        const { scrollTop, scrollHeight, clientHeight } = target;
        if (scrollHeight - scrollTop - clientHeight < 100) {
          loadMoreItems();
        }
      }
    },
    [setScrollTop, loadMoreItems, variant],
  );

  // 🎯 확장/축소 핸들러 (simple variant용)
  const handleToggleExpand = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      toggleExpand(index);
    },
    [toggleExpand],
  );

  // 🎯 현재 섹션 자동 스크롤 (variant가 "full"일 때만)
  useEffect(() => {
    if (variant === "full" && currentSection && scrollContainerRef.current) {
      const currentIndex = virtualItems.items.findIndex(
        (item) => item.href === currentSection.href,
      );

      if (currentIndex !== -1) {
        const targetScrollTop =
          (virtualItems.startIndex + currentIndex) * itemHeight;
        scrollContainerRef.current.scrollTop = targetScrollTop;
      }
    }
  }, [currentSection, virtualItems, itemHeight, variant]);

  // 🎯 빈 상태 처리
  if (!toc || toc.length === 0) {
    const EmptyIcon = variant === "simple" ? Book : BookOpen;
    const emptyMessage =
      variant === "simple" ? "목차가 없습니다" : "목차를 불러오는 중입니다";
    const emptySubMessage =
      variant === "full"
        ? "잠시만 기다려주세요. 또는 이 책에 목차가 없을 수 있습니다."
        : null;

    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <EmptyIcon className="mb-2 size-8 text-gray-400" />
        <p className="text-sm text-gray-600">{emptyMessage}</p>
        {emptySubMessage && (
          <p className="text-xs text-gray-500">{emptySubMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 제목 (showTitle이 true이고 propToc가 없을 때만) */}
      {showTitle && !propToc && (
        <h3 className="mb-4 text-lg font-medium">목차</h3>
      )}

      <div
        ref={scrollContainerRef}
        className={
          variant === "simple"
            ? "overflow-y-auto pr-1"
            : "relative overflow-auto"
        }
        style={{
          height: variant === "simple" ? undefined : finalHeight,
          maxHeight: variant === "simple" ? finalHeight : undefined,
        }}
        onScroll={handleScroll}
      >
        {/* 🎯 통합된 가상 스크롤 컨테이너 */}
        <div style={{ height: virtualItems.totalHeight, position: "relative" }}>
          <div
            style={{
              transform: `translateY(${virtualItems.offsetY}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {virtualItems.items.map((item) =>
              variant === "full" ? (
                // 🎯 Full variant: VirtualizedTocItem 사용
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
              ) : (
                /* eslint-disable */
                <div
                  key={`${item.id || item.href}-${item.index}`}
                  className="py-1"
                  style={{ height: itemHeight }}
                >
                  <div
                    className="group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-muted"
                    style={{ paddingLeft: `${item.level * 16 + 8}px` }}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {/* 확장/축소 버튼 */}
                    {item.hasChildren && (
                      <button
                        type="button"
                        className="mr-1 rounded p-0.5 hover:bg-gray-200"
                        onClick={(e) => handleToggleExpand(e, item.index)}
                      >
                        {item.isExpanded ? (
                          <ChevronDown size={12} />
                        ) : (
                          <ChevronRight size={12} />
                        )}
                      </button>
                    )}

                    {/* 번호 */}
                    {showNumbering && (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {item.numbering}
                      </span>
                    )}

                    {/* 제목 */}
                    <span className="truncate text-sm group-hover:text-primary">
                      {item.label}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* 빈 아이템 상태 (variant가 "full"일 때만) */}
      {variant === "full" && virtualItems.items.length === 0 && (
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

// 🎯 SimpleVirtualizedToc를 위한 편의 함수
export function SimpleVirtualizedToc(
  props: Omit<VirtualizedTocProps, "variant">,
) {
  return <VirtualizedToc {...props} variant="simple" showTitle={false} />;
}
