import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { primaryColor } from "@bookiwi/color";

import ErrorPage from "#/components/error";
import { GUEST_USER } from "#/constants/guest";
import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const Route = createFileRoute("/auth/")({
  beforeLoad: async () => {
    const isLoggedInAsGuest = await userManager.isLoggedInAsGuest();
    if (isLoggedInAsGuest) {
      userManager.logoutAsGuestMode();
      return;
    }
    const isLoggedInAsUser = await userManager.isLoggedInAsUser();
    if (isLoggedInAsUser) {
      throw redirect({ to: "/my-kiwis" });
    }
  },
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
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const handleKakaoLogin = async () => {
    try {
      await supabaseManager.auth.signInWithKakao({
        options: {
          redirectTo: `${window.location.origin}/my-kiwis`,
        },
      });
    } catch {
      setError(new Error("로그인 중 오류가 발생했습니다."));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await supabaseManager.auth.signInWithGoogle({
        options: {
          redirectTo: `${window.location.origin}/my-kiwis`,
        },
      });
    } catch {
      setError(new Error("로그인 중 오류가 발생했습니다."));
    }
  };

  const handleGuestMode = () => {
    userManager.loginAsGuestMode(GUEST_USER);
    navigate({ to: "/my-kiwis" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <article className="w-full max-w-md">
        {/* 메인 컨테이너 */}
        <section className="space-y-8 rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm">
          {/* 로고 섹션 */}
          <header className="relative space-y-4">
            {/* 키위새 로고 (중앙 고정) */}
            <button
              type="button"
              onClick={handleGuestMode}
              className="peer relative mx-auto flex size-24 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                background: primaryColor,
              }}
              aria-label="게스트 모드로 체험하기"
            >
              <img
                src="/images/icon.webp"
                alt="Bookiwi Logo"
                className="size-16 object-contain"
              />
            </button>

            {/* 키위새가 말하는 말풍선 (절대 위치) */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 transition-all duration-200 peer-hover:-translate-y-2 peer-hover:scale-110">
              <button
                type="button"
                onClick={handleGuestMode}
                className="group relative rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-3 text-sm font-medium text-green-700 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
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

          {/* 소셜 로그인 버튼들 */}
          <section className="space-y-3 pt-3">
            {/* 구글 로그인 버튼 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-gray-700 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.98]"
              aria-label="구글로 로그인하기"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-base font-medium">Google로 시작하기</span>
              </div>
            </button>

            {/* 카카오 로그인 버튼 */}
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
