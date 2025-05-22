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
import { StateDispatchProps, Step, kiwiReducer, initialState } from "./reducer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "#/components/ui/dialog";

const Titles: Record<Step, string> = {
  1: "새로운 키위 만들기",
  2: "새로운 키위 만들기",
  3: "키위 처리 중",
  4: "키위 생성 완료",
};

const Descriptions: Record<Step, string> = {
  1: "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.",
  2: "키위에서 사용할 EPUB 파일을 업로드하세요.",
  3: "EPUB 파일을 처리하고 키위를 생성하는 중입니다...",
  4: "아래 공유 코드를 사용해 친구들을 초대하세요.",
};

const Contents: Record<Step, ComponentType<StateDispatchProps>> = {
  1: KiwiInfo,
  2: EpubUpload,
  3: Loading,
  4: CreatedSuccess,
};

const FooterButtons: Record<Step, ComponentType<FooterButtonProps>> = {
  1: Step1FooterButton,
  2: Step2FooterButton,
  3: Step3FooterButton,
  4: Step4FooterButton,
};

interface CreateKiwiModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateKiwiModal({ open, setOpen }: CreateKiwiModalProps) {
  const [state, dispatch] = useReducer(kiwiReducer, initialState);

  const { step, selectedFile } = state;

  // 단계별 유효성 검증 함수
  const validateStep1 = (): boolean => {
    dispatch({ type: "VALIDATE_STEP_1" });

    // 유효성 검증 후 state가 바로 업데이트되지 않으므로 직접 검증
    const { kiwiName, passwordProtected, password, confirmPassword } = state;

    const hasNameError = kiwiName.trim() === "";
    const hasPasswordError =
      passwordProtected && (password === "" || password !== confirmPassword);

    return !(hasNameError || hasPasswordError);
  };

  const validateStep2 = (): boolean => {
    dispatch({ type: "VALIDATE_STEP_2" });
    return !!selectedFile;
  };

  const handleNext = () => {
    if (!validateStep1()) return;
    dispatch({ type: "SET_STEP", payload: 2 });
  };

  const handleBack = () => {
    if (step === 4) {
      // 완료 단계에서는 첫 단계로 돌아감
      handleClose();
    } else if (step === 2) {
      dispatch({ type: "SET_STEP", payload: 1 });
    }
  };

  const handleClose = () => {
    dispatch({ type: "RESET" });
    setOpen(false);
  };

  const getButtonClickHandler = (currentStep: Step) => {
    if (currentStep === 1) return handleNext;
    if (currentStep === 2) return handleSubmit;
    return handleClose;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    dispatch({ type: "SET_STEP", payload: 3 }); // 로딩 단계로 전환

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
      dispatch({ type: "SET_SHARE_CODE", payload: generatedShareCode });

      // 성공 단계로 이동
      dispatch({ type: "SET_STEP", payload: 4 });
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
            onClickSecondary: step === 2 ? handleBack : undefined,
          })}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateKiwiModal;
