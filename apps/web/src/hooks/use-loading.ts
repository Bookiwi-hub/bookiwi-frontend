import { useCallback, useState } from "react";

/**
 * 비동기 함수의 로딩 상태를 관리하는 훅
 * @param func - 실행할 비동기 함수
 * @returns [isLoading, handleLoad] - 로딩 상태와 실행 함수
 *
 * @example
 * ```typescript
 * const [isLoading, handleSave] = useLoading(saveData);
 *
 * const handleSubmit = async () => {
 *   const result = await handleSave(formData);
 *   console.log('저장 완료:', result);
 * };
 *
 * return (
 *   <button onClick={handleSubmit} disabled={isLoading}>
 *     {isLoading ? '저장 중...' : '저장'}
 *   </button>
 * );
 * ```
 */
export const useLoading = <T extends (...args: any[]) => Promise<any>>(
  func: T,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        setIsLoading(true);
        const result = await func(...args);
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    [func],
  );

  return [isLoading, handleLoad] as const;
};

/**
 * 비동기 함수의 로딩 상태와 에러 상태를 함께 관리하는 훅
 * @param func - 실행할 비동기 함수
 * @returns [isLoading, isError, handleLoad] - 로딩 상태, 에러 상태, 실행 함수
 *
 * @example
 * ```typescript
 * const [isLoading, isError, handleDelete] = useLoadingError(deleteKiwi);
 *
 * const handleDeleteClick = async () => {
 *   const result = await handleDelete(kiwiId);
 *   if (isError) {
 *     alert('삭제 중 오류가 발생했습니다.');
 *     return;
 *   }
 *   alert('삭제가 완료되었습니다.');
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleDeleteClick} disabled={isLoading}>
 *       {isLoading ? '삭제 중...' : '삭제'}
 *     </button>
 *     {isError && <p className="error">삭제 실패</p>}
 *   </div>
 * );
 * ```
 */
export const useLoadingError = <T extends (...args: any[]) => Promise<any>>(
  func: T,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoad = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
      try {
        setIsLoading(true);
        setIsError(false);
        const result = await func(...args);
        return result;
      } catch (error) {
        setIsError(true);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [func],
  );

  return [isLoading, isError, handleLoad] as const;
};
