import { useState, useMemo, useCallback } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";

interface FlattenedTocItem extends NavItem {
  level: number;
  index: number;
  isExpanded?: boolean;
  hasChildren: boolean;
  parentIndex?: number;
  numbering: string;
}

interface UseVirtualizedTocProps {
  toc: NavItem[];
  itemHeight?: number;
  containerHeight?: number;
  expandedByDefault?: boolean;
}

// 캐시를 위한 WeakMap - toc 구조별로 기본 평면화 결과 저장
const tocCache = new WeakMap<NavItem[], FlattenedTocItem[]>();

// 기본 구조 평면화 (확장 상태 무관)
function createBaseFlatStructure(
  items: NavItem[],
  level = 0,
  parentIndex?: number,
  parentNumbering = "",
): FlattenedTocItem[] {
  const result: FlattenedTocItem[] = [];

  items.forEach((item, index) => {
    const currentIndex = result.length;
    const hasChildren = Boolean(item.subitems && item.subitems.length > 0);
    const numbering = parentNumbering
      ? `${parentNumbering}.${index + 1}`
      : `${index + 1}`;

    const flatItem: FlattenedTocItem = {
      ...item,
      level,
      index: currentIndex,
      hasChildren,
      parentIndex,
      numbering,
    };

    result.push(flatItem);

    // 자식이 있으면 모든 자식을 재귀적으로 추가 (확장 상태 무관)
    if (hasChildren) {
      const children = createBaseFlatStructure(
        item.subitems!,
        level + 1,
        currentIndex,
        numbering,
      );
      result.push(...children);
    }
  });

  return result;
}

// 확장 상태에 따라 필터링
function filterByExpandedState(
  baseStructure: FlattenedTocItem[],
  expandedItems: Set<number>,
  expandedByDefault: boolean,
): FlattenedTocItem[] {
  const result: FlattenedTocItem[] = [];
  const skipLevels = new Set<number>();

  baseStructure.forEach((item) => {
    // 현재 레벨보다 깊은 레벨의 스킵 정보 정리
    const levelsToDelete = Array.from(skipLevels).filter(
      (level) => level >= item.level,
    );
    levelsToDelete.forEach((level) => skipLevels.delete(level));

    // 부모가 접혀있으면 스킵
    if (skipLevels.has(item.level)) {
      return;
    }

    const isExpanded = expandedByDefault || expandedItems.has(item.index);
    const newItem: FlattenedTocItem = {
      ...item,
      level: item.level, // 명시적으로 level 포함
      hasChildren: item.hasChildren, // 명시적으로 hasChildren 포함
      index: result.length, // 새로운 인덱스 할당
      isExpanded,
    };

    result.push(newItem);

    // 자식이 있지만 접혀있으면 자식들을 스킵하도록 설정
    if (item.hasChildren && !isExpanded) {
      skipLevels.add(item.level + 1);
    }
  });

  return result;
}

export function useVirtualizedToc({
  toc,
  itemHeight = 40,
  containerHeight = 400,
  expandedByDefault = false,
}: UseVirtualizedTocProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);

  // 기본 평면화 구조 캐싱
  const baseStructure = useMemo(() => {
    // 캐시에서 확인
    let cached = tocCache.get(toc);

    if (!cached) {
      // 캐시에 없으면 새로 계산하고 저장
      cached = createBaseFlatStructure(toc);
      tocCache.set(toc, cached);
    }

    return cached;
  }, [toc]);

  // 확장 상태에 따른 최종 평면화 (확장 상태가 변경될 때만 재계산)
  const flattenToc = useMemo(
    () =>
      filterByExpandedState(baseStructure, expandedItems, expandedByDefault),
    [baseStructure, expandedItems, expandedByDefault],
  );

  // 가상 스크롤 계산
  const virtualItems = useMemo(() => {
    const visibleItemCount = Math.ceil(containerHeight / itemHeight) + 2;
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

  // 무한 스크롤을 위한 페이지네이션
  const loadMoreItems = useCallback(() => {
    console.log("Load more items...");
  }, []);

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

export type { FlattenedTocItem, UseVirtualizedTocProps };
