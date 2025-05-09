/**
 * 지정된 최대 길이로 텍스트를 자르고 필요한 경우 말줄임표를 추가합니다.
 *
 * @param {string} text - 잘라낼 문자열
 * @param {number} maxLength - 잘라내기 전 문자열의 최대 길이
 * @returns {string} 말줄임표가 있는 잘린 문자열 또는 최대 길이를 초과하지 않는 경우 원본 문자열
 *
 * @example
 * // "Hello..." 반환
 * truncate("Hello, world!", 5);
 *
 * @example
 * // "Hello, world!" 반환
 * truncate("Hello, world!", 20);
 */
const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export default truncate;
