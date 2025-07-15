export const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = originalName.split(".").pop();
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, "");

  return `${nameWithoutExtension}-${timestamp}-${randomString}.${fileExtension}`;
};

export const extractFilePathFromUrl = (
  url: string,
  bucketName: string,
): string | null => {
  try {
    // Supabase Storage URL 형태: https://project-ref.supabase.co/storage/v1/object/public/bucket-name/file-path
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const publicIndex = pathParts.findIndex((part) => part === "public");
    const bucketIndex = pathParts.findIndex((part) => part === bucketName);

    let filePath: string | null = null;

    if (publicIndex !== -1 && bucketIndex !== -1 && bucketIndex > publicIndex) {
      // bucket-name 다음의 모든 경로를 파일 경로로 사용
      filePath = pathParts.slice(bucketIndex + 1).join("/");
    } else {
      // 위 방법이 실패하면 마지막 경로 요소를 파일명으로 사용
      filePath = pathParts[pathParts.length - 1] || null;
    }

    // URL 디코딩 적용 (예: %20을 공백으로 변환)
    if (filePath) {
      try {
        return decodeURIComponent(filePath);
      } catch (decodeError) {
        console.error("URL 디코딩 실패:", decodeError);
        // 디코딩에 실패하면 원본 경로를 반환
        return filePath;
      }
    }

    return null;
  } catch (error) {
    console.error("파일 경로 추출 실패:", error);
    return null;
  }
};
