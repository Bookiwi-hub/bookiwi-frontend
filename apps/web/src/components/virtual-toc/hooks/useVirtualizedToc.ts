import { useState, useMemo } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";

interface FlattenedTocItem extends NavItem {
  level: number;
  index: number;
  isExpanded?: boolean;
  hasChildren: boolean;
  parentIndex?: number;
}

interface UseVirtualizedTocProps {
  toc: NavItem[];
  itemHeight?: number;
  containerHeight?: number;
  expandedByDefault?: boolean;
}

export function useVirtualizedToc({
  toc,
  itemHeight = 40,
  containerHeight = 400,
  expandedByDefault = false,
}: UseVirtualizedTocProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);

  // 트리를 평면화하는 함수
  const flattenToc = useMemo(() => {
    const flattenItems = (
      items: NavItem[],
      level = 0,
      parentIndex?: number,
    ): FlattenedTocItem[] => {
      const result: FlattenedTocItem[] = [];

      items.forEach((item) => {
        const currentIndex = result.length;
        const hasChildren = Boolean(item.subitems && item.subitems.length > 0); // Boolean으로 명시적 변환

        const flatItem: FlattenedTocItem = {
          ...item,
          level,
          index: currentIndex,
          hasChildren,
          parentIndex,
          isExpanded: expandedByDefault || expandedItems.has(currentIndex),
        };

        result.push(flatItem);

        // 자식이 있고 확장된 상태라면 자식들도 추가
        if (
          hasChildren &&
          (expandedByDefault || expandedItems.has(currentIndex))
        ) {
          const children = flattenItems(
            item.subitems!,
            level + 1,
            currentIndex,
          );
          result.push(...children);
        }
      });

      return result;
    };

    return flattenItems(toc);
  }, [toc, expandedItems, expandedByDefault]);

  // 가상 스크롤 계산
  const virtualItems = useMemo(() => {
    const visibleItemCount = Math.ceil(containerHeight / itemHeight) + 2; // 버퍼 추가
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleItemCount, flattenToc.length);

    return {
      items: flattenToc.slice(startIndex, endIndex),
      startIndex,
      endIndex,
      totalHeight: flattenToc.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [flattenToc, scrollTop, itemHeight, containerHeight]);

  // 항목 확장/축소 토글
  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // 무한 스크롤을 위한 페이지네이션 (필요시)
  const loadMoreItems = () => {
    // 실제 API 호출이 있다면 여기서 구현
    console.log("Load more items...");
  };

  return {
    virtualItems,
    flattenToc,
    scrollTop,
    setScrollTop,
    toggleExpand,
    loadMoreItems,
    totalItems: flattenToc.length,
  };
}
