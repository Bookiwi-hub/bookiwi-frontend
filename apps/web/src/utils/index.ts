// 객체의 키를 타입 안전하게 추출하는 함수
/**
 * 객체의 키를 배열로 반환하며, 타입을 유지합니다.
 * @param {T} o - 키를 추출할 객체
 * @return {(keyof T)[]} - 객체의 키 배열
 * @example
 * const obj = { name: 'John', age: 30 };
 * getKeys(obj); // ['name', 'age']
 */
export function getKeys<T extends object>(o: T) {
  return Object.keys(o) as (keyof T)[]; // Object.keys는 string[]을 반환하지만, as (keyof T)[]로 타입 단언하여 keyof T 타입으로 변환
}
