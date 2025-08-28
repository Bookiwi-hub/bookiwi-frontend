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
 * 범위 CFI에서 시작점 CFI를 추출합니다.
 * @param {string} cfi 범위 CFI 또는 단일 CFI
 * @returns {string} 시작점 CFI
 */
export const extractStartCfiFromRange = (cfi: string): string => {
  const isRangeCfi = cfi.includes(",");

  if (!isRangeCfi) {
    return cfi;
  }

  const rangeParts = cfi.split(",");
  if (rangeParts.length >= 2 && rangeParts[0] && rangeParts[1]) {
    const basePath = rangeParts[0];
    const startPath = rangeParts[1];
    return basePath + startPath;
  }

  return cfi;
};

/**
 * CFI 문자열에서 경로 구성 요소들을 파싱합니다.
 * @param {string} cfi CFI 문자열
 * @returns {object} 파싱된 CFI 구성 요소들
 */
export const parseCfiComponents = (cfi: string) => {
  const basePart = cfi.substring(8); // "epubcfi(" 제거
  const baseIndex = basePart.indexOf("!");

  if (baseIndex === -1) {
    return {
      hasBase: false,
      basePart,
      base: "",
      path: "",
    };
  }

  const base = basePart.substring(0, baseIndex + 1);
  const path = basePart.substring(baseIndex + 1, basePart.length - 1);

  return {
    hasBase: true,
    basePart,
    base,
    path,
  };
};

/**
 * 두 CFI를 사용해서 범위 CFI를 구성합니다.
 * @param {string} startCfi 시작점 CFI
 * @param {string} endCfi 끝점 CFI
 * @returns {string} 구성된 범위 CFI
 */
export const buildRangeCfi = (startCfi: string, endCfi: string): string => {
  const startComponents = parseCfiComponents(startCfi);

  if (!startComponents.hasBase) {
    return `epubcfi(${startComponents.basePart},${endCfi.substring(8, endCfi.length - 1)})`;
  }

  const endPath = endCfi.substring(endCfi.indexOf("!") + 1, endCfi.length - 1);

  return `epubcfi(${startComponents.base},${startComponents.path},${endPath})`;
};
