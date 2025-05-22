import { ComponentType, createElement, useReducer } from "react";

import CreatedSuccess from "./created-success";
import EpubUpload from "./epub-upload";
import {
  FooterButtonProps,
  Step1FooterButton,
  Step2FooterButton,
  Step3FooterButton,
  Step4FooterButton,
} from "./footer-buttons";
import KiwiInfo from "./kiwi-info";
import Loading from "./loading";
import {
  StateDispatchProps,
  Step,
  kiwiReducer,
  initialState,
  ActionTypes,
} from "./reducer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "#/components/ui/dialog";

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

const Contents: Record<Step, ComponentType<StateDispatchProps>> = {
  [Step.BasicInfo]: KiwiInfo,
  [Step.FileUpload]: EpubUpload,
  [Step.Processing]: Loading,
  [Step.Complete]: CreatedSuccess,
};

const FooterButtons: Record<Step, ComponentType<FooterButtonProps>> = {
  [Step.BasicInfo]: Step1FooterButton,
  [Step.FileUpload]: Step2FooterButton,
  [Step.Processing]: Step3FooterButton,
  [Step.Complete]: Step4FooterButton,
};

interface CreateKiwiModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateKiwiModal({ open, setOpen }: CreateKiwiModalProps) {
  const [state, dispatch] = useReducer(kiwiReducer, initialState);

  const { step } = state;

  // 단계별 유효성 검증 함수
  const validateStep1 = (): boolean => {
    const nameError = state.kiwiName.trim() === "";
    const passwordError =
      state.passwordProtected &&
      (state.password === "" || state.password !== state.confirmPassword);
    dispatch({ type: ActionTypes.SET_NAME_ERROR, payload: nameError });
    dispatch({ type: ActionTypes.SET_PASSWORD_ERROR, payload: passwordError });

    return !nameError && !passwordError;
  };

  const validateStep2 = (): boolean => {
    const fileError = state.selectedFile === null;
    dispatch({ type: ActionTypes.SET_FILE_ERROR, payload: fileError });
    return !fileError;
  };

  const handleNext = () => {
    if (!validateStep1()) return;
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.FileUpload });
  };

  const handleBack = () => {
    if (step === Step.FileUpload) {
      dispatch({ type: ActionTypes.SET_STEP, payload: Step.BasicInfo });
    }
  };

  const handleClose = () => {
    dispatch({ type: ActionTypes.RESET });
    setOpen(false);
  };

  const getButtonClickHandler = (currentStep: Step) => {
    if (currentStep === Step.BasicInfo) return handleNext;
    if (currentStep === Step.FileUpload) return handleSubmit;
    return handleClose;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.Processing }); // 로딩 단계로 전환

    try {
      // 여기서 실제로 API 호출 등의 작업을 수행
      // 예시로 setTimeout을 사용해 비동기 작업 시뮬레이션
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      // 공유 코드 생성 (실제로는 API에서 받아와야 함)
      const generatedShareCode = `KIWI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      dispatch({
        type: ActionTypes.SET_SHARE_CODE,
        payload: generatedShareCode,
      });

      // 성공 단계로 이동
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

        {createElement(Contents[step], { state, dispatch })}

        <DialogFooter className="sm:justify-between">
          {createElement(FooterButtons[step], {
            onClick: getButtonClickHandler(step),
            onClickSecondary: step === Step.FileUpload ? handleBack : undefined,
          })}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateKiwiModal;
