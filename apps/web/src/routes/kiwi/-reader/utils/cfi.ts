import { EpubCFI } from "@bookiwi/epubjs";

import { Cfi } from "../types";

export const isCfiInRange = (cfi: Cfi, currentCfi: Cfi): boolean => {
  const cfiInstance = new EpubCFI();
  const isStartInRange =
    cfiInstance.compare(cfi.start, currentCfi.start) >= 0 &&
    cfiInstance.compare(cfi.start, currentCfi.end) <= 0;
  const isEndInRange =
    cfiInstance.compare(cfi.end, currentCfi.start) >= 0 &&
    cfiInstance.compare(cfi.end, currentCfi.end) <= 0;
  return isStartInRange || isEndInRange;
};

/**
 * 주어진 대상 CFI가 비교 CFI를 지났는지 확인합니다.
 * 범위 CFI인 경우 끝점을 기준으로, 단일 CFI인 경우 해당 위치를 기준으로 비교합니다.
 * @param {string} targetCfi 확인하려는 대상 CFI (단일 CFI 또는 범위 CFI).
 * @param {string} comparisonCfi 비교 기준이 되는 CFI.
 * @returns {boolean} 대상 CFI가 비교 CFI를 지났으면 true, 그렇지 않으면 false.
 */
export const hasCfiPassed = (
  targetCfi: string,
  comparisonCfi: string,
): boolean => {
  const cfiInstance = new EpubCFI();

  let cfiToCompare = targetCfi;
  if (targetCfi.includes(",")) {
    const rangeParts = targetCfi.split(",");
    if (rangeParts.length >= 3 && rangeParts[0] && rangeParts[2]) {
      const basePath = rangeParts[0];
      const endPath = rangeParts[2];
      cfiToCompare = basePath + endPath;
    }
  }

  return cfiInstance.compare(cfiToCompare, comparisonCfi) > 0;
};

/**
 * 선택한 텍스트의 시작점부터 현재 페이지 끝까지의 CFI 범위를 생성합니다.
 * @param {string} selectedCfi 선택된 텍스트의 CFI (단일 CFI 또는 범위 CFI)
 * @param {string} pageEndCfi 현재 페이지 끝의 CFI
 * @returns {string} 선택 시작점부터 페이지 끝까지의 CFI 범위
 */
export const createCfiFromSelectionToPageEnd = (
  selectedCfi: string,
  pageEndCfi: string,
): string => {
  // 선택된 CFI가 범위 CFI인지 확인 (쉼표로 구분되는지 체크)
  const isRangeCfi = selectedCfi.includes(",");

  let startCfi: string;

  if (isRangeCfi) {
    const rangeParts = selectedCfi.split(",");
    if (rangeParts.length >= 2 && rangeParts[0] && rangeParts[1]) {
      const basePath = rangeParts[0];
      const startPath = rangeParts[1];
      startCfi = basePath + startPath;
    } else {
      startCfi = selectedCfi;
    }
  } else {
    startCfi = selectedCfi;
  }

  const basePart = startCfi.substring(8);
  const baseIndex = basePart.indexOf("!");

  if (baseIndex === -1) {
    return `epubcfi(${basePart},${pageEndCfi.substring(8, pageEndCfi.length - 1)})`;
  }

  const base = basePart.substring(0, baseIndex + 1);
  const startPath = basePart.substring(baseIndex + 1, basePart.length - 1);
  const endPath = pageEndCfi.substring(
    pageEndCfi.indexOf("!") + 1,
    pageEndCfi.length - 1,
  );

  return `epubcfi(${base},${startPath},${endPath})`;
};

/**
 * CFI로부터 Range 객체를 생성합니다.
 * @param {string} cfi CFI 문자열
 * @param {any} currentView 현재 뷰 객체 (contents 속성을 가진)
 * @returns {Range | null} 생성된 Range 객체 또는 null
 */
export const createRangeFromCfi = (
  cfi: string,
  currentView: any,
): Range | null => {
  try {
    if (!currentView?.contents) {
      return null;
    }
    return currentView.contents.range(cfi);
  } catch (error) {
    console.error("Failed to create range from CFI:", error);
    return null;
  }
};
