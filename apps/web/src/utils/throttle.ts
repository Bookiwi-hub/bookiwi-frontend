/**
 * 쓰로틀링 함수
 * @param func - 쓰로틀할 함수
 * @param wait - 제한 시간(밀리초)
 * @returns 원본 함수의 쓰로틀된 버전
 * @example
 * // 300ms마다 최대 한 번만 실행되는 스크롤 이벤트 핸들러 쓰로틀
 * const throttledScroll = throttle(() => {
 *   updateScrollPosition();
 * }, 300);
 *
 * // 스크롤 이벤트에 쓰로틀된 함수 연결
 * window.addEventListener('scroll', throttledScroll);
 */

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let isThrottled = false;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    if (isThrottled) {
      lastArgs = args;
      return;
    }

    func(...args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (lastArgs) {
        func(...lastArgs);
        lastArgs = null;
      }
    }, wait);
  };
};
