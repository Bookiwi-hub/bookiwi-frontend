import { useRouter } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { createKiwiAtom, setShareCodeAtom, stepAtom } from "../atoms";
import { Step } from "../types";

import tempUser from "#/DB/users";
import { Button } from "#/components/ui/button";
import { DialogFooter } from "#/components/ui/dialog";
import { color, primaryColor } from "#/constants/color";
import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { EpubIDBData, KiwiIDBData, ParticipantIDBData } from "#/types/idb";
import { fileToBookInfo } from "#/utils/epubjs";

function StepThree() {
  const newKiwi = useAtomValue(createKiwiAtom);
  const setShareCode = useSetAtom(setShareCodeAtom);
  const setStep = useSetAtom(stepAtom);
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasExecutedRef = useRef(false);
  const router = useRouter();
  const [isFailed, setIsFailed] = useState(false);

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    setStep(Step.Two);
  };

  useEffect(() => {
    // Strict Mode에서 중복 실행 방지
    if (hasExecutedRef.current) {
      return;
    }
    hasExecutedRef.current = true;

    const handleSubmit = async () => {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      try {
        // 여기서 실제로 API 호출 등의 작업을 수행

        // const res = await fetch('/api/submit', {
        //   method: 'POST',
        //   body: JSON.stringify(data),
        //   signal: controller.signal, // ✅ 여기가 중요
        // });
        // const book = new Book(state.selectedFile);

        const bookInfo = await fileToBookInfo(newKiwi.file!);

        // 공유 코드 생성 (실제로는 API에서 받아와야 함)
        const generatedShareCode = `KIWI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const generatedKiwiId = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();
        const generatedEpubId = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

        const generatedParticipantId = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

        if (abortControllerRef.current?.signal.aborted) {
          return;
        }
        const kiwiIDBData: KiwiIDBData = {
          id: generatedKiwiId,
          name: newKiwi.kiwiName,
          description: newKiwi.kiwiDescription,
          maxParticipants: newKiwi.maxParticipants,
          detailDescription: newKiwi.kiwiDetailDescription,
          password: newKiwi.password,
          shareCode: generatedShareCode,
          createdAt: new Date().toISOString(),
          coverImage: bookInfo.coverImageBlob,
          bookMetadata: {
            title: bookInfo.title,
            author: bookInfo.author,
            publisher: bookInfo.publisher,
            toc: bookInfo.toc,
          },
          epubId: generatedEpubId,
          adminId: tempUser.id,
          participantIds: [generatedParticipantId],
        };

        const participantIDBData: ParticipantIDBData = {
          id: generatedParticipantId,
          kiwiId: generatedKiwiId,
          userId: tempUser.id,
          name: tempUser.name,
          profileImage: tempUser.profileImage,
          color: color[0],
          record: {
            currentCfi: null,
            percentage: null,
            bookmarks: [],
          },
          settings: {
            isSinglePage: false,
            fontFamily: null,
            fontSize: null,
            lineHeight: null,
            fontWeight: null,
          },
          lastActivityAt: new Date().toISOString(),
        };

        const epubIDBData: EpubIDBData = {
          id: generatedEpubId,
          kiwiId: generatedKiwiId,
          file: bookInfo.file,
          locations: bookInfo.locations,
        };

        await idb.add(IDBStore.KiwiStore, kiwiIDBData);
        await idb.add(IDBStore.EpubStore, epubIDBData);
        await idb.add(IDBStore.ParticipantStore, participantIDBData);

        await router.invalidate();
        setShareCode(generatedShareCode);
        setStep(Step.Four);
      } catch (error) {
        setIsFailed(true);
      }
    };
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFailed ? (
    <FailedKiwi onGoBack={() => setStep(Step.Two)} />
  ) : (
    <LoadingKiwi onCancel={handleCancel} />
  );
}

function LoadingKiwi({ onCancel }: { onCancel: () => void }) {
  return (
    <>
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
      <DialogFooter className="sm:justify-between">
        <Button onClick={onCancel} className="ml-auto">
          취소
        </Button>
      </DialogFooter>
    </>
  );
}

function FailedKiwi({ onGoBack }: { onGoBack: () => void }) {
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
      </DialogFooter>
    </>
  );
}

export default StepThree;
