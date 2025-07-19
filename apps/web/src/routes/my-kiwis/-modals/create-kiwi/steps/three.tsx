import { useRouter } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

import { primaryColor } from "@bookiwi/color";
import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { closeCreateKiwiModalAtom } from "../../atoms";
import { createKiwiAtom, setShareCodeAtom, stepAtom } from "../atoms";
import { Step } from "../types";

import { Button } from "#/components/ui/button";
import { DialogFooter } from "#/components/ui/dialog";
import { useLoadingError } from "#/hooks/use-loading";
import userManager from "#/managers/user";
import { createKiwi } from "#/routes/my-kiwis/-apis";

function StepThree() {
  const newKiwi = useAtomValue(createKiwiAtom);
  const setShareCode = useSetAtom(setShareCodeAtom);
  const setStep = useSetAtom(stepAtom);
  const closeCreateKiwiModal = useSetAtom(closeCreateKiwiModalAtom);

  const router = useRouter();
  const hasExecutedRef = useRef(false);

  const [isLoading, isError, handleCreateKiwi] = useLoadingError(createKiwi);

  useEffect(() => {
    // Strict Mode에서 중복 실행 방지
    if (hasExecutedRef.current) {
      return;
    }
    hasExecutedRef.current = true;

    const handleCreate = async () => {
      const result = await handleCreateKiwi({
        userId: userManager.userId!,
        name: newKiwi.kiwiName,
        description: newKiwi.kiwiDescription,
        detailDescription: newKiwi.kiwiDetailDescription,
        maxParticipants: newKiwi.maxParticipants,
        password: newKiwi.password,
        file: newKiwi.file!,
      });
      if (!result) return;
      const { shareCode } = result;
      await router.invalidate();
      setShareCode(shareCode);
      setStep(Step.Four);
    };

    handleCreate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <FailedKiwi
        onGoBack={() => setStep(Step.Two)}
        onClose={closeCreateKiwiModal}
      />
    );
  }

  if (isLoading) {
    return <LoadingKiwi />;
  }

  // 성공한 경우 Step.Four로 자동 이동되므로 이 부분은 실행되지 않음
  return null;
}

function LoadingKiwi() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10">
      <div className="flex justify-center">
        <div
          className="rounded-full p-4 shadow-sm"
          style={{ backgroundColor: primaryColor }}
        >
          <img
            src="/images/icon.webp"
            alt="Bookiwi logo"
            className="size-16 animate-spin"
          />
        </div>
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-lg font-medium">키위를 만들고 있어요</h3>
        <p className="text-sm text-muted-foreground">
          시간이 걸릴 수 있어요. 잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}

function FailedKiwi({
  onGoBack,
  onClose,
}: {
  onGoBack: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6 py-10">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4 shadow-sm">
            <AlertTriangle className="size-16 text-red-600" />
          </div>
        </div>

        <div className="space-y-3 text-center">
          <h3 className="text-lg font-medium text-red-700">
            키위 생성에 실패했어요
          </h3>
          <p className="text-sm text-muted-foreground">
            파일에 문제가 있을 수 있어요.
            <br />
            업로드한 파일을 다시 확인해주세요.
          </p>
        </div>
      </div>
      <DialogFooter className="sm:justify-between">
        <Button onClick={onGoBack} variant="outline">
          이전
        </Button>
        <Button onClick={onClose} variant="default">
          닫기
        </Button>
      </DialogFooter>
    </>
  );
}

export default StepThree;
