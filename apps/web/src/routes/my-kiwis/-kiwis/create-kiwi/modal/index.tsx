import { ComponentType, createElement, useRef } from "react";

import { CreateKiwiProvider, useCreateKiwi } from "./context";
import CreatedSuccess from "./created-success";
import EpubUpload from "./epub-upload";
import {
  Step1FooterButton,
  Step2FooterButton,
  Step3FooterButton,
  Step4FooterButton,
} from "./footer-buttons";
import KiwiInfo from "./kiwi-info";
import Loading from "./loading";
import { ActionTypes, Step } from "./reducer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "#/components/ui/dialog";
import { useKiwis } from "#/routes/my-kiwis/-context";
import { Kiwi } from "#/types/kiwi";
import { addToIndexedDB } from "#/utils/epubjs";

const Titles: Record<Step, string> = {
  [Step.BasicInfo]: "새로운 키위 만들기",
  [Step.FileUpload]: "새로운 키위 만들기",
  [Step.Processing]: "키위 처리 중",
  [Step.Complete]: "키위 생성 완료",
};

const Descriptions: Record<Step, string> = {
  [Step.BasicInfo]:
    "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.",
  [Step.FileUpload]: "키위에서 사용할 EPUB 파일을 업로드하세요.",
  [Step.Processing]: "EPUB 파일을 처리하고 키위를 생성하는 중입니다...",
  [Step.Complete]: "아래 공유 코드를 사용해 친구들을 초대하세요.",
};

const Contents: Record<Step, ComponentType> = {
  [Step.BasicInfo]: KiwiInfo,
  [Step.FileUpload]: EpubUpload,
  [Step.Processing]: Loading,
  [Step.Complete]: CreatedSuccess,
};

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateKiwiModalDialog({ open, setOpen }: ModalProps) {
  const { state, dispatch } = useCreateKiwi();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { setNewKiwi } = useKiwis();
  const { step } = state;

  const handleClose = () => {
    dispatch({ type: ActionTypes.RESET });
    setOpen(false);
  };
  const handleAbort = () => {
    abortControllerRef.current?.abort();
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.BasicInfo });
  };

  const handleSubmit = async () => {
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.Processing }); // 로딩 단계로 전환
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

      const res = await addToIndexedDB(state.selectedFile!);

      // 공유 코드 생성 (실제로는 API에서 받아와야 함)
      const generatedShareCode = `KIWI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      const newKiwi: Kiwi = {
        id: res.id,
        name: state.kiwiName,
        description: state.kiwiDescription,
        lastActivityAt: "1시간 전",
        detailDescription: "",
        isPrivate: state.passwordProtected,
        memberCount: 1,
        progress: 0,
        book: {
          title: res.metadata.title,
          author: res.metadata.author,
          coverImage: res.coverImage,
        },
        discussions: [],
        createdAt: "",
        admin: "",
      };
      setNewKiwi(newKiwi);
      dispatch({
        type: ActionTypes.SET_SHARE_CODE,
        payload: generatedShareCode,
      });
      dispatch({ type: ActionTypes.SET_STEP, payload: Step.Complete });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("키위 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>{Titles[step]}</DialogTitle>
          <DialogDescription>{Descriptions[step]}</DialogDescription>
        </DialogHeader>

        {createElement(Contents[step])}

        <DialogFooter className="sm:justify-between">
          {step === Step.BasicInfo && <Step1FooterButton />}
          {step === Step.FileUpload && (
            <Step2FooterButton onSubmit={handleSubmit} />
          )}
          {step === Step.Processing && (
            <Step3FooterButton onAbort={handleAbort} />
          )}
          {step === Step.Complete && (
            <Step4FooterButton onClick={handleClose} />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateKiwiModal({ open, setOpen }: ModalProps) {
  return (
    <CreateKiwiProvider>
      <CreateKiwiModalDialog open={open} setOpen={setOpen} />
    </CreateKiwiProvider>
  );
}

export default CreateKiwiModal;
