/**
 * Blob URL을 Blob 객체로 변환하는 함수
 * @param {string} url - Blob URL
 * @returns {Promise<Blob>} Blob 객체
 */
export const urlToBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url);
  return response.blob();
};

export const urlToDataUrl = async (url: string): Promise<string> => {
  const blob = await urlToBlob(url);
  return URL.createObjectURL(blob);
};
