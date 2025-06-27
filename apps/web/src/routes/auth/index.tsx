import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { primaryColor } from "@bookiwi/color";

import ErrorPage from "#/components/error";
import supabaseManager from "#/managers/supabase";

export const Route = createFileRoute("/auth/")({
  head: () => ({
    meta: [
      {
        title: "Bookiwi | 로그인",
      },
    ],
  }),
  component: AuthPage,
  errorComponent: ({ error }) => (
    <ErrorPage
      title="로그인 오류"
      message={error?.message || "로그인 중 오류가 발생했습니다."}
      onRetry={() => window.location.reload()}
    />
  ),
});

function AuthPage() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const handleKakaoLogin = async () => {
    try {
      await supabaseManager.auth.signInWithKakao();
    } catch (err) {
      setError(new Error("로그인 중 오류가 발생했습니다."));
    }
  };

  const handleGuestMode = () => {
    // 게스트 모드 로직 추가 예정
    console.log("게스트 모드로 체험하기");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <article className="w-full max-w-md">
        {/* 메인 컨테이너 */}
        <section className="space-y-8 rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm">
          {/* 로고 섹션 */}
          <header className="relative space-y-4">
            {/* 키위새 로고 (중앙 고정) */}
            <Link
              to="/"
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
            </Link>

            {/* 키위새가 말하는 말풍선 (절대 위치) */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2">
              <button
                type="button"
                onClick={handleGuestMode}
                className="group relative rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-3 text-sm font-medium text-green-700 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-200 active:scale-95"
                aria-label="로그인 없이 체험해보기"
              >
                {/* 말풍선 꼬리 (아래쪽으로) */}
                <div className="absolute bottom-0 left-1/2 size-0 -translate-x-1/2 translate-y-4 border-x-[14px] border-t-[40px] border-x-transparent border-t-green-100 transition-colors duration-200 group-hover:border-t-green-200" />

                <span className="relative z-10 whitespace-nowrap">
                  로그인 없이 체험해 보실래요?
                </span>

                {/* 호버 효과 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-200 to-emerald-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            </div>

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
          <section className="pt-3">
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="w-full rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 active:scale-[0.98]"
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
