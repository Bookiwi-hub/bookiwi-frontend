// 객체의 키를 타입 안전하게 추출하는 함수
/**
 * 객체의 키를 배열로 반환하며, 타입을 유지합니다.
 * @param {T} o - 키를 추출할 객체
 * @return {(keyof T)[]} - 객체의 키 배열
 * @example
 * const obj = { name: 'John', age: 30 };
 * getKeys(obj); // ['name', 'age']
 */
export const getKeys = <T extends object>(o: T) =>
  Object.keys(o) as (keyof T)[]; // Object.keys는 string[]을 반환하지만, as (keyof T)[]로 타입 단언하여 keyof T 타입으로 변환

/**
 * 주어진 값을 최소값과 최대값 사이로 제한합니다.
 * @param {number} value - 제한할 값
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @return {number} - 최소값과 최대값 사이로 제한된 값
 * @example
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export * from "./debounce";
export * from "./epubjs";
export * from "./file";
export * from "./format-date";
export * from "./throttle";
export { default as truncate } from "./truncate";
