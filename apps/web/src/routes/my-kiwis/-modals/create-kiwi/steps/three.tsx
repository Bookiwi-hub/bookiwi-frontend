import { useRouter } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { primaryColor } from "@bookiwi/color";
import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  closeCreateKiwiModalAtom,
  createKiwiAtom,
  setShareCodeAtom,
  stepAtom,
} from "../atoms";
import { Step } from "../types";

import { Button } from "#/components/ui/button";
import { DialogFooter } from "#/components/ui/dialog";
import supabase from "#/managers/supabase";
import userManager from "#/managers/user";

function StepThree() {
  const newKiwi = useAtomValue(createKiwiAtom);
  const setShareCode = useSetAtom(setShareCodeAtom);
  const setStep = useSetAtom(stepAtom);
  const closeCreateKiwiModal = useSetAtom(closeCreateKiwiModalAtom);

  const hasExecutedRef = useRef(false);
  const router = useRouter();
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    // Strict Mode에서 중복 실행 방지
    if (hasExecutedRef.current) {
      return;
    }
    hasExecutedRef.current = true;

    const handleSubmit = async () => {
      try {
        throw new Error("test");
        const { shareCode } = await supabase.kiwi.createKiwi({
          userId: userManager.userId!,
          name: newKiwi.kiwiName,
          description: newKiwi.kiwiDescription,
          detailDescription: newKiwi.kiwiDetailDescription,
          maxParticipants: newKiwi.maxParticipants,
          password: newKiwi.password,
          file: newKiwi.file!,
        });
        await router.invalidate();
        setShareCode(shareCode);
        setStep(Step.Four);
      } catch (error) {
        setIsFailed(true);
      }
    };
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFailed ? (
    <FailedKiwi
      onGoBack={() => setStep(Step.Two)}
      onClose={closeCreateKiwiModal}
    />
  ) : (
    <LoadingKiwi />
  );
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
            className="size-16 animate-bounce"
          />
        </div>
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-lg font-medium">키위를 만들고 있어요</h3>
        <p className="text-sm text-muted-foreground">
          시간이 거릴 수 있어요. 잠시만 기다려주세요.
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
