import { useState } from "react";

type LoadingHookReturn<T> = [
  boolean, // isLoading
  Error | null, // loadingError
  (...args: any[]) => Promise<T | null>, // handleLoad
];

/**
 * 비동기 데이터 로딩 상태를 관리하는 커스텀 훅
 *
 * @template T - 데이터 타입
 * @param {Function} getData - 데이터를 가져오는 비동기 함수
 * @returns {LoadingHookReturn<T>} [isLoading, loadingError, handleLoad] 배열
 *
 * @example
 * // 기본 사용법
 * const [isLoading, error, fetchUsers] = useLoading(async () => {
 *   const response = await fetch('/api/users');
 *   return response.json();
 * });
 *
 * // 매개변수가 있는 함수 사용
 * const [isLoading, error, fetchUser] = useLoading(async (userId: string) => {
 *   const response = await fetch(`/api/users/${userId}`);
 *   return response.json();
 * });
 *
 * // 컴포넌트에서 사용
 * const MyComponent = () => {
 *   const [isLoading, error, loadData] = useLoading(async (page: number) => {
 *     const response = await fetch(`/api/data?page=${page}`);
 *     return response.json();
 *   });
 *
 *   const handleClick = () => {
 *     loadData(1); // 첫 번째 페이지 데이터 로드
 *   };
 *
 *   if (isLoading) return <div>로딩 중...</div>;
 *   if (error) return <div>에러: {error.message}</div>;
 *
 *   return <button onClick={handleClick}>데이터 로드</button>;
 * };
 */
const useLoading = <T>(
  getData: (...args: any[]) => Promise<T>,
): LoadingHookReturn<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const handleLoad = async (...args: any[]): Promise<T | null> => {
    try {
      setLoadingError(null);
      setIsLoading(true);
      const result = await getData(...args);
      return result;
    } catch (error) {
      setLoadingError(error as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, loadingError, handleLoad];
};

export default useLoading;
