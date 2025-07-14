import { redirect, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { createSampleKiwi } from "../-apis";

import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import Spinner from "#/components/ui/spinner";
import userManager from "#/managers/user";

function KiwiSampleCardLoading() {
  return (
    <Card className="flex h-96 w-full max-w-72 flex-col items-center justify-center rounded-2xl border border-slate-200/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-8 text-primary" />
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            예시 키위 준비 중
          </p>
          <p className="text-xs text-slate-500">잠시만 기다려주세요...</p>
        </div>
      </div>
    </Card>
  );
}

function KiwiSampleCardError({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="flex h-96 w-full max-w-72 flex-col items-center justify-center rounded-2xl border border-slate-200/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            예시 키위 생성에 실패했습니다
          </p>
        </div>
        <Button onClick={onRetry} variant="outline" size="sm">
          다시 시도
        </Button>
      </div>
    </Card>
  );
}

function KiwiSampleCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const hasExecutedRef = useRef(false);

  const createSample = useCallback(async () => {
    if (!userManager.userId) throw redirect({ to: "/auth" });

    setIsLoading(true);
    setHasError(false);

    try {
      await createSampleKiwi(userManager.userId);
      await router.invalidate();
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // 개발 모드에서 중복 실행 방지
    if (hasExecutedRef.current) return;
    hasExecutedRef.current = true;

    createSample();
  }, [createSample]);

  const handleRetry = () => {
    createSample();
  };

  if (hasError) {
    return <KiwiSampleCardError onRetry={handleRetry} />;
  }

  if (isLoading) {
    return <KiwiSampleCardLoading />;
  }

  return <KiwiSampleCardLoading />;
}

export default KiwiSampleCard;
