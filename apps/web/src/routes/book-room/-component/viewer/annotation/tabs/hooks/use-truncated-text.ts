import { useState } from "react";

interface UseTruncatedTextProps {
  text: string;
  maxLength?: number;
}

interface UseTruncatedTextResult {
  displayText: string;
  isTruncated: boolean;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

/**
 * "더 보기/접기" 기능을 가진 텍스트 잘라내기 관리 훅
 *
 * @param {Object} props - 훅 속성
 * @param {string} props.text - 잘라낼 가능성이 있는 텍스트
 * @param {number} [props.maxLength=100] - 텍스트가 잘리기 전 최대 길이
 *
 * @returns {Object} 결과 객체
 * @returns {string} result.displayText - 표시할 텍스트 (잘린 텍스트 또는 전체 텍스트)
 * @returns {boolean} result.isTruncated - 텍스트가 최대 길이를 초과하는지 여부
 * @returns {boolean} result.isExpanded - 텍스트가 현재 확장되어 있는지 여부
 * @returns {Function} result.toggleExpanded - 확장 상태를 전환하는 함수
 *
 * @example
 * ```tsx
 * function TextComponent({ content }: { content: string }) {
 *   const { displayText, isTruncated, isExpanded, toggleExpanded } = useTruncatedText({
 *     text: content,
 *     maxLength: 150
 *   });
 *
 *   return (
 *     <div>
 *       <p>{displayText}</p>
 *       {isTruncated && (
 *         <button onClick={toggleExpanded}>
 *           {isExpanded ? "접기" : "더 보기"}
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTruncatedText({
  text,
  maxLength = 100,
}: UseTruncatedTextProps): UseTruncatedTextResult {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = text.length > maxLength;

  const displayText =
    isExpanded || !isTruncated ? text : `${text.slice(0, maxLength)}...`;

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return {
    displayText,
    isTruncated,
    isExpanded,
    toggleExpanded,
  };
}
