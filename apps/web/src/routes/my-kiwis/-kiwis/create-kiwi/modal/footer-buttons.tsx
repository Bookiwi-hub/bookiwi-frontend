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

export function Step2FooterButton() {
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
      dispatch({ type: ActionTypes.SET_STEP, payload: Step.Complete });

      // 성공 단계로 이동
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("키위 생성 중 오류가 발생했습니다.");
    }
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

// Step3 doesn't have buttons (loading screen)

export function Step3FooterButton() {
  const { dispatch } = useCreateKiwi();
  const handleClose = () => {
    dispatch({ type: ActionTypes.RESET });
    dispatch({ type: ActionTypes.SET_STEP, payload: Step.BasicInfo });
  };
  return (
    <Button onClick={handleClose} className="ml-auto">
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
