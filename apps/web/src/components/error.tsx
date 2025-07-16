import * as Sentry from "@sentry/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { primaryColor } from "@bookiwi/color";

import { Button } from "./ui/button";

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
  error?: Error;
}

function ErrorPage({
  title = "앗! 뭔가 잘못되었어요",
  message = "잠깐만요... 다시 한번 시도해볼까요? 🤔",
  onRetry,
  showHomeButton = true,
  error,
}: ErrorProps) {
  const routerState = useRouterState();

  useEffect(() => {
    // props로 전달된 error가 있는 경우 Sentry로 전송
    if (error) {
      Sentry.captureException(error, {
        tags: {
          component: "ErrorPage",
          source: "error-boundary",
        },
        extra: {
          routerLocation: routerState.location.pathname,
          errorBoundary: true,
        },
      });
    }
  }, [error, routerState.location.pathname]);

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

        {/* 버튼들 */}
        <div className="space-y-3 pt-2">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="w-full rounded-full border-gray-200 bg-white transition-colors hover:border-gray-300 hover:bg-gray-50"
              size="lg"
            >
              <RotateCcw className="mr-2 size-4 text-gray-600" />
              <span className="text-gray-700">다시 시도해보기</span>
            </Button>
          )}
          {showHomeButton && (
            <Button
              asChild
              className="w-full rounded-full border-0 text-white transition-all hover:opacity-90 hover:shadow-lg"
              size="lg"
            >
              <Link to="/">
                <Home className="mr-2 size-4" />
                홈으로 돌아가기
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
