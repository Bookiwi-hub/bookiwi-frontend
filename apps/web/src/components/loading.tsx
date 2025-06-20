import { primaryColor } from "#/constants/color";

interface LoadingProps {
  title?: string;
  message?: string;
}

function LoadingPage({
  title = "로딩 중입니다",
  message = "잠시만 기다려주세요...",
}: LoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-sm space-y-8 text-center">
        {/* 로고 */}
        <div className="flex justify-center">
          <div
            className="rounded-full p-4 shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            <img
              src="/images/icon.webp"
              alt="Bookiwi logo"
              className="size-16 animate-bounce"
            />
          </div>
        </div>

        {/* 제목 */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm leading-relaxed text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
