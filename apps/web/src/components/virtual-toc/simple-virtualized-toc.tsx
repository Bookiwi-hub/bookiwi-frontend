import { Book, ChevronRight, ChevronDown } from "lucide-react";
import { useCallback, useRef, useState, useMemo } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";

// 평면화된 목차 아이템 타입
interface FlatTocItem extends NavItem {
  level: number;
  index: number;
  numbering: string;
  isExpanded?: boolean;
  hasChildren: boolean;
}

interface SimpleVirtualizedTocProps {
  toc: NavItem[];
  maxHeight?: number;
  itemHeight?: number;
  onNavigate?: (href: string) => void;
}

export function SimpleVirtualizedToc({
  toc,
  maxHeight = 240,
  itemHeight = 32,
  onNavigate,
}: SimpleVirtualizedTocProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // 목차를 평면화하는 함수
  const flattenedToc = useMemo(() => {
    const flattenItems = (
      items: NavItem[],
      level = 0,
      parentNumbering = "",
    ): FlatTocItem[] => {
      const result: FlatTocItem[] = [];

      items.forEach((item, index) => {
        const currentIndex = result.length;
        const numbering = parentNumbering
          ? `${parentNumbering}.${index + 1}`
          : `${index + 1}`;
        const hasChildren = Boolean(item.subitems?.length);

        const flatItem: FlatTocItem = {
          ...item,
          level,
          index: currentIndex,
          numbering,
          hasChildren,
          isExpanded: expandedItems.has(currentIndex),
        };

        result.push(flatItem);

        // 확장된 상태이고 자식이 있으면 자식들도 추가
        if (hasChildren && expandedItems.has(currentIndex)) {
          const children = flattenItems(item.subitems!, level + 1, numbering);
          result.push(...children);
        }
      });

      return result;
    };

    return flattenItems(toc);
  }, [toc, expandedItems]);

  // 가상 스크롤 계산
  const virtualItems = useMemo(() => {
    const visibleItemCount = Math.ceil(maxHeight / itemHeight) + 2;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + visibleItemCount,
      flattenedToc.length,
    );

    return {
      items: flattenedToc.slice(startIndex, endIndex),
      startIndex,
      endIndex,
      totalHeight: flattenedToc.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [flattenedToc, scrollTop, itemHeight, maxHeight]);

  // 스크롤 핸들러
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // 확장/축소 토글
  const toggleExpand = useCallback((index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // 네비게이션 핸들러
  const handleNavigate = useCallback(
    (href: string) => {
      if (onNavigate) {
        onNavigate(href);
      }
    },
    [onNavigate],
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
            /* eslint-disable */
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(item.index);
                    }}
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
