/**
 * 디바운싱 함수
 * @param func - 디바운스할 함수
 * @param wait - 지연 시간(밀리초)
 * @returns 원본 함수의 디바운스된 버전
 * @example
 * // 300ms의 비활성 시간 후에만 실행되는 검색 함수 디바운스
 * const debouncedSearch = debounce((query: string) => {
 *   fetchSearchResults(query);
 * }, 300);
 *
 * // 사용자 입력 시 디바운스된 함수 호출
 * searchInput.addEventListener('input', (e) => {
 *   debouncedSearch(e.target.value);
 * });
 */

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
};
