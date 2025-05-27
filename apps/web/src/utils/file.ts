/**
 * Blob URL을 Blob 객체로 변환하는 함수
 *
 * @description
 * 주어진 URL에서 데이터를 가져와 Blob 객체로 변환합니다.
 * 이미지, 파일 등의 리소스 URL을 처리할 때 유용합니다.
 *
 * @example
 * ```typescript
 * // 이미지 URL을 Blob으로 변환
 * const imageUrl = 'https://example.com/image.jpg';
 * const imageBlob = await urlToBlob(imageUrl);
 * console.log(imageBlob.type); // "image/jpeg"
 * ```
 *
 * @param {string} url - 변환할 URL 문자열
 * @returns {Promise<Blob>} 변환된 Blob 객체
 */
export const urlToBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url);
  return response.blob();
};

/**
 * URL을 Object URL로 변환하는 함수
 *
 * @description
 * 주어진 URL에서 데이터를 가져와 브라우저 메모리에 저장하고 접근할 수 있는
 * Object URL을 생성합니다.
 * 이 URL은 브라우저 세션 내에서만 유효하며, 사용 후에는 URL.revokeObjectURL()을
 * 통해 메모리를 해제해야 합니다.
 *
 * @example
 * ```typescript
 * // 원격 이미지를 로컬 Object URL로 변환
 * const imageUrl = 'https://example.com/image.jpg';
 * const objectUrl = await urlToObjectUrl(imageUrl);
 *
 * // 이미지 엘리먼트에 적용
 * const imgElement = document.createElement('img');
 * imgElement.src = objectUrl;
 * document.body.appendChild(imgElement);
 *
 * // 사용 후 메모리 해제 (필요시)
 * // URL.revokeObjectURL(objectUrl);
 * ```
 *
 * @param {string} url - 변환할 URL 문자열
 * @returns {Promise<string>} 생성된 Object URL
 */
export const urlToObjectUrl = async (url: string): Promise<string> => {
  const blob = await urlToBlob(url);
  return URL.createObjectURL(blob);
};

/**
 * URL을 Base64 인코딩 문자열로 변환하는 함수
 *
 * @description
 * 주어진 URL에서 데이터를 가져와 Base64로 인코딩된 데이터 URL 문자열로 변환합니다.
 * 이미지나 파일을 문자열 형태로 저장하거나 전송할 때 유용합니다.
 * 변환된 Base64 문자열은 'data:[MIME 타입];base64,[데이터]' 형식을 갖습니다.
 *
 * @example
 * ```typescript
 * // 이미지 URL을 Base64로 변환
 * const imageUrl = 'https://example.com/image.jpg';
 * const base64String = await urlToBase64(imageUrl);
 * console.log(base64String); // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD..."
 *
 * // Base64 이미지를 이미지 엘리먼트에 직접 적용
 * const imgElement = document.createElement('img');
 * imgElement.src = base64String;
 * document.body.appendChild(imgElement);
 *
 * // 로컬 스토리지에 저장
 * localStorage.setItem('savedImage', base64String);
 * ```
 *
 * @param {string} url - 변환할 URL 문자열
 * @returns {Promise<string>} Base64로 인코딩된 데이터 URL 문자열
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  const blob = await urlToBlob(url);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const blobToObjectUrl = async (blob: Blob): Promise<string> =>
  URL.createObjectURL(blob);
