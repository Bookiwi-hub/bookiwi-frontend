import { createFileRoute } from "@tanstack/react-router";

import { primaryColor } from "@bookiwi/color";

export const Route = createFileRoute("/auth/")({
  component: AuthPage,
});

function AuthPage() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가 예정
    console.log("카카오 로그인 클릭됨");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <article className="w-full max-w-md">
        {/* 메인 컨테이너 */}
        <section className="space-y-8 rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm">
          {/* 로고 섹션 */}
          <header className="space-y-4">
            <figure
              className="mx-auto flex size-24 items-center justify-center rounded-full shadow-lg"
              style={{
                background: primaryColor,
              }}
            >
              <img
                src="/images/icon.webp"
                alt="Bookiwi Logo"
                className="size-16 object-contain"
              />
            </figure>
            <hgroup className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                Bookiwi
              </h1>
              <p className="text-sm font-medium text-gray-500">
                함께 읽는 즐거움
              </p>
            </hgroup>
          </header>

          {/* 카카오 로그인 버튼 */}
          <section className="pt-4">
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 active:scale-[0.98]"
              aria-label="카카오톡으로 로그인하기"
            >
              <img
                src="/images/kakao-login-button.webp"
                alt="카카오로 시작하기"
                className="h-auto w-full rounded-2xl shadow-lg"
              />
            </button>
          </section>
        </section>

        {/* 하단 작은 텍스트 */}
        <footer className="mt-6 text-center">
          <small className="text-xs text-gray-400">
            로그인하여 친구들과 함께 책을 읽어보세요
          </small>
        </footer>
      </article>
    </main>
  );
}
