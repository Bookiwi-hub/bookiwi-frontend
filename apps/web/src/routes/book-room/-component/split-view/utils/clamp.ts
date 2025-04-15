// 숫자를 특정 범위로 제한하는 함수
/**
 * 주어진 숫자를 min과 max 사이로 제한합니다.
 * @param {number} value - 제한할 숫자
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @return {number} - min과 max 사이의 값
 * @example
 * clamp(5, 1, 10); // 5
 * clamp(0, 1, 10); // 1
 * clamp(15, 1, 10); // 10
 */
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default clamp;
