import { useEffect, useRef } from "react";

type Options = boolean | EventListenerOptions;

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: any, e: WindowEventMap[K]) => void,
  options?: Options,
): void;

export function useEventListener<
  EventMap extends {} = WindowEventMap,
  T extends EventTarget = EventTarget,
  K extends keyof EventMap = keyof EventMap,
>(
  target: T | (() => T) | undefined,
  type: K,
  listener: (this: any, e: EventMap[K]) => void,
  options?: Options,
): void;

/**
 * 이벤트 리스너를 요소나 전역 창에 쉽게 연결할 수 있는 훅입니다.
 *
 * 이 훅은 컴포넌트가 언마운트될 때 자동으로 이벤트 리스너를 제거하며,
 * 리스너 함수가 변경되어도 최신 참조를 유지합니다.
 *
 * @param args - 다음 두 가지 형식의 인자를 받습니다:
 *   - [type, listener, options]: 전역 창(window)에 이벤트를 등록할 때 사용
 *   - [target, type, listener, options]: 특정 DOM 요소에 이벤트를 등록할 때 사용
 *
 * @example
 * // 전역 창에 이벤트 리스너 등록
 * useEventListener('resize', () => {
 *   console.log('창 크기가 변경되었습니다');
 * });
 *
 * // 특정 요소에 이벤트 리스너 등록
 * const buttonRef = useRef(null);
 * useEventListener(buttonRef, 'click', () => {
 *   console.log('버튼이 클릭되었습니다');
 * });
 *
 * // 참조 함수 사용
 * useEventListener(() => document.getElementById('my-element'), 'click', () => {
 *   console.log('요소가 클릭되었습니다');
 * });
 */
export function useEventListener(...args: any[]) {
  let target: any;
  let type: string;
  let listener: any;
  let options: any;

  if (typeof args[0] === "string") {
    [type, listener, options] = args;
    target = globalThis;
  } else {
    [target, type, listener, options] = args;
  }

  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    const currentListener = (e: any) => listenerRef.current(e);
    const currentTarget = typeof target === "function" ? target() : target;
    currentTarget?.addEventListener(type, currentListener, options);
    return () =>
      currentTarget?.removeEventListener(type, currentListener, options);
  }, [options, target, type]);
}
