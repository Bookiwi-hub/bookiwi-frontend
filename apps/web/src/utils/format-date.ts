/**
 * 날짜 객체를 "YYYY-MM-DD 오전/오후 H:MM" 형식의 문자열로 변환합니다.
 *
 * @param date - 변환할 날짜 객체
 * @returns 포맷된 날짜 및 시간 문자열
 *
 * @example
 * // 결과: "2023-05-15 오후 3:30"
 * formatDateTime(new Date(2023, 4, 15, 15, 30));
 */
export const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for display

  return `${year}-${month}-${day} ${period} ${displayHours}:${minutes}`;
};

/**
 * 날짜 문자열을 상황에 맞는 형식으로 변환합니다.
 * - 1분 미만: "방금 전"
 * - 1시간 미만: "X분 전"
 * - 오늘: "오전/오후 H:MM"
 * - 그 외: "YYYY-MM-DD 오전/오후 H:MM"
 *
 * @param dateString - 변환할 날짜 문자열
 * @returns 포맷된 날짜 문자열
 *
 * @example
 * // 방금 전인 경우
 * formatDate(new Date().toISOString()); // "방금 전"
 *
 * // 30분 전인 경우
 * // 결과: "30분 전"
 * formatDate(new Date(Date.now() - 30 * 60 * 1000).toISOString());
 *
 * // 오늘 날짜인 경우
 * // 결과: "오전 11:30"
 * formatDate(new Date(new Date().setHours(11, 30)).toISOString());
 *
 * // 과거 날짜인 경우
 * // 결과: "2023-01-15 오후 2:30"
 * formatDate("2023-01-15T14:30:00.000Z");
 */
export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const now = new Date();

  const diffMs = now.getTime() - dateObj.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const isToday =
    dateObj.getDate() === now.getDate() &&
    dateObj.getMonth() === now.getMonth() &&
    dateObj.getFullYear() === now.getFullYear();

  if (diffMinutes < 1) {
    return "방금 전";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  if (isToday) {
    const hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const period = hours < 12 ? "오전" : "오후";
    const displayHours = hours % 12 || 12; // Convert 0 to 12 for display

    return `${period} ${displayHours}:${minutes}`;
  }

  return formatDateTime(dateObj);
};

/**
 * 날짜 객체를 "YYYY-MM-DD" 형식의 문자열로 변환합니다.
 *
 * @param date - 변환할 날짜 객체
 * @returns 포맷된 날짜 문자열
 *
 * @example
 * // 결과: "2023-05-15"
 * formatDateOnly(new Date(2023, 4, 15).toISOString());
 */
export const formatDateOnly = (date: string): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
