import { Book, ChevronRight, ChevronDown } from "lucide-react";
import { useCallback, useRef } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";

import { useVirtualizedToc } from "./hooks/useVirtualizedToc";

interface SimpleVirtualizedTocProps {
  toc: NavItem[];
  maxHeight?: number;
  itemHeight?: number;
  onNavigate?: (href: string) => void;
  expandedByDefault?: boolean;
}

export function SimpleVirtualizedToc({
  toc,
  maxHeight = 240,
  itemHeight = 32,
  onNavigate,
  expandedByDefault = false,
}: SimpleVirtualizedTocProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, setScrollTop, toggleExpand } = useVirtualizedToc({
    toc,
    itemHeight,
    containerHeight: maxHeight,
    expandedByDefault,
  });

  // 🎯 메모이제이션된 핸들러들
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      setScrollTop(target.scrollTop);
    },
    [setScrollTop],
  );

  const handleNavigate = useCallback(
    (href: string) => {
      if (onNavigate) {
        onNavigate(href);
      }
    },
    [onNavigate],
  );

  const handleToggleExpand = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      toggleExpand(index);
    },
    [toggleExpand],
  );

  if (!toc || toc.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <Book className="mb-2 size-8 text-gray-400" />
        <p className="text-sm text-gray-600">목차가 없습니다</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto pr-1"
      style={{ maxHeight }}
      onScroll={handleScroll}
    >
      {/* 전체 높이를 위한 컨테이너 */}
      <div style={{ height: virtualItems.totalHeight, position: "relative" }}>
        {/* 가상화된 아이템들만 렌더링 */}
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
            /*eslint-disable*/
            <div
              key={`${item.id || item.href}-${item.index}`}
              className="py-1"
              style={{ height: itemHeight }}
            >
              <div
                className="group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-muted"
                style={{ paddingLeft: `${item.level * 16 + 8}px` }}
                onClick={() => handleNavigate(item.href)}
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
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {item.numbering}
                </span>

                {/* 제목 */}
                <span className="truncate text-sm group-hover:text-primary">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
