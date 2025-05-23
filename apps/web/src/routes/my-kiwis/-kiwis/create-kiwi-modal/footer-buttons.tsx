import { useCreateKiwi } from "./context";
import { ActionTypes, Step } from "./reducer";

import { Button } from "#/components/ui/button";

interface ButtonProps {
  onClick: () => void;
  onClickSecondary?: () => void;
}

export type FooterButtonProps = Partial<ButtonProps>;

export function Step1FooterButton() {
  const { state, dispatch } = useCreateKiwi();

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

  const handleNext = () => {
    if (!validateStep1()) return;
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.FileUpload });
  };

  return (
    <Button onClick={handleNext} className="ml-auto">
      다음
    </Button>
  );
}

export function Step2FooterButton({
  onSubmit,
}: {
  onSubmit: () => Promise<void>;
}) {
  const { state, dispatch } = useCreateKiwi();

  const validateStep2 = (): boolean => {
    const fileError = state.selectedFile === null;
    dispatch({ type: ActionTypes.SET_FILE_ERROR, payload: fileError });
    return !fileError;
  };
  const handleBack = () => {
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.BasicInfo });
  };
  const handleSubmit = async () => {
    if (!validateStep2()) return;
    await onSubmit();
  };

  return (
    <>
      <Button variant="outline" onClick={handleBack}>
        이전
      </Button>
      <Button onClick={handleSubmit}>만들기</Button>
    </>
  );
}

export function Step3FooterButton({ onAbort }: { onAbort: () => void }) {
  return (
    <Button onClick={onAbort} className="ml-auto">
      취소
    </Button>
  );
}

export function Step4FooterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="ml-auto">
      완료
    </Button>
  );
}
