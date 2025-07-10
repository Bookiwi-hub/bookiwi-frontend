/**
 * Deferred 객체의 타입 정의
 * @template T Promise가 해결될 때의 값 타입
 */
export interface Deferred<T = any> {
  /** 생성된 Promise 객체 */
  promise: Promise<T>;
  /** Promise를 성공으로 해결하는 함수 */
  resolve: (value: T) => void;
  /** Promise를 실패로 거부하는 함수 */
  reject: (reason?: any) => void;
}

/**
 * 외부에서 제어 가능한 Promise를 생성합니다.
 *
 * 일반적인 Promise는 생성자 내부에서만 resolve/reject가 가능하지만,
 * defer를 사용하면 Promise 생성 후에도 외부에서 상태를 변경할 수 있습니다.
 *
 * @template T Promise가 해결될 때 반환할 값의 타입
 * @returns resolve와 reject 함수가 포함된 Deferred 객체
 *
 * @example
 * ```typescript
 * // 기본 사용법
 * const deferred = defer<string>();
 *
 * // 다른 곳에서 Promise 사용
 * deferred.promise.then(value => {
 *   console.log('받은 값:', value);
 * });
 *
 * // 나중에 해결
 * setTimeout(() => {
 *   deferred.resolve('안녕하세요!');
 * }, 1000);
 * ```
 *
 * @example
 * ```typescript
 * // 에러 처리
 * const deferred = defer<number>();
 *
 * deferred.promise.catch(error => {
 *   console.error('에러 발생:', error);
 * });
 *
 * // 조건에 따라 성공/실패 처리
 * if (someCondition) {
 *   deferred.resolve(42);
 * } else {
 *   deferred.reject(new Error('조건을 만족하지 않음'));
 * }
 * ```
 *
 * @example
 * ```typescript
 * // 이벤트 기반 Promise
 * function waitForEvent(eventName: string): Promise<Event> {
 *   const deferred = defer<Event>();
 *
 *   const handler = (event: Event) => {
 *     element.removeEventListener(eventName, handler);
 *     deferred.resolve(event);
 *   };
 *
 *   element.addEventListener(eventName, handler);
 *   return deferred.promise;
 * }
 * ```
 */
export function defer<T = any>(): Deferred<T> {
  let resolve: (value: T) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}

export default defer;
