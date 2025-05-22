import { Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { createElement, Dispatch, useReducer } from "react";

import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Switch } from "#/components/ui/switch";

// 상태 타입 정의
type Step = 1 | 2 | 3 | 4;

interface KiwiState {
  step: Step;
  kiwiName: string;
  kiwiDescription: string;
  passwordProtected: boolean;
  password: string;
  confirmPassword: string;
  passwordError: boolean;
  nameError: boolean;
  descriptionError: boolean;
  selectedFile: File | null;
  fileError: boolean;
  shareCode: string;
  copied: boolean;
}

// 액션 타입 정의
type KiwiAction =
  | { type: "SET_STEP"; payload: Step }
  | { type: "SET_KIWI_NAME"; payload: string }
  | { type: "SET_KIWI_DESCRIPTION"; payload: string }
  | { type: "SET_PASSWORD_PROTECTED"; payload: boolean }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: boolean }
  | { type: "SET_NAME_ERROR"; payload: boolean }
  | { type: "SET_DESCRIPTION_ERROR"; payload: boolean }
  | { type: "SET_SELECTED_FILE"; payload: File | null }
  | { type: "SET_FILE_ERROR"; payload: boolean }
  | { type: "SET_SHARE_CODE"; payload: string }
  | { type: "SET_COPIED"; payload: boolean }
  | { type: "VALIDATE_STEP_1" }
  | { type: "VALIDATE_STEP_2" }
  | { type: "RESET" };

// 초기 상태
const initialState: KiwiState = {
  step: 1,
  kiwiName: "",
  kiwiDescription: "",
  passwordProtected: false,
  password: "",
  confirmPassword: "",
  passwordError: false,
  nameError: false,
  descriptionError: false,
  selectedFile: null,
  fileError: false,
  shareCode: "",
  copied: false,
};

// 리듀서 함수
const kiwiReducer = (state: KiwiState, action: KiwiAction): KiwiState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_KIWI_NAME":
      return { ...state, kiwiName: action.payload, nameError: false };
    case "SET_KIWI_DESCRIPTION":
      return {
        ...state,
        kiwiDescription: action.payload,
        descriptionError: false,
      };
    case "SET_PASSWORD_PROTECTED":
      return { ...state, passwordProtected: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload, passwordError: false };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
        passwordError: false,
      };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "SET_NAME_ERROR":
      return { ...state, nameError: action.payload };
    case "SET_DESCRIPTION_ERROR":
      return { ...state, descriptionError: action.payload };
    case "SET_SELECTED_FILE":
      return { ...state, selectedFile: action.payload, fileError: false };
    case "SET_FILE_ERROR":
      return { ...state, fileError: action.payload };
    case "SET_SHARE_CODE":
      return { ...state, shareCode: action.payload };
    case "SET_COPIED":
      return { ...state, copied: action.payload };
    case "VALIDATE_STEP_1": {
      const nameError = state.kiwiName.trim() === "";
      const passwordError =
        state.passwordProtected &&
        (state.password === "" || state.password !== state.confirmPassword);

      return {
        ...state,
        nameError,
        descriptionError: false,
        passwordError,
      };
    }
    case "VALIDATE_STEP_2": {
      const fileError = !state.selectedFile;
      return { ...state, fileError };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

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

const Contents: Record<Step, React.ComponentType<StateDispatchProps>> = {
  1: KiwiInfoForm,
  2: EpubUploadForm,
  3: LoadingScreen,
  4: KiwiCreatedSuccess,
};

interface CreateKiwiModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateKiwiModal({
  open,
  setOpen,
}: CreateKiwiModalProps) {
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
      console.error("키위 생성 중 오류 발생:", error);
      // 오류 처리 로직 추가 가능
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
          <FooterButtons
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FooterButtonsProps {
  step: Step;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  onClose: () => void;
}

function FooterButtons({
  step,
  onNext,
  onBack,
  onSubmit,
  onClose,
}: FooterButtonsProps) {
  switch (step) {
    case 1:
      return (
        <Button onClick={onNext} className="ml-auto">
          다음
        </Button>
      );
    case 2:
      return (
        <>
          <Button variant="outline" onClick={onBack}>
            이전
          </Button>
          <Button type="submit" onClick={onSubmit}>
            만들기
          </Button>
        </>
      );
    case 3:
      return null; // 로딩 화면에서는 footer 버튼 없음
    case 4:
      return (
        <Button onClick={onClose} className="ml-auto">
          완료
        </Button>
      );
    default:
      return null;
  }
}

interface StateDispatchProps {
  state: KiwiState;
  dispatch: Dispatch<KiwiAction>;
}

function KiwiInfoForm({ state, dispatch }: StateDispatchProps) {
  const {
    kiwiName,
    kiwiDescription,
    passwordProtected,
    password,
    confirmPassword,
    passwordError,
    nameError,
  } = state;

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="kiwi-name" className="flex items-center gap-1">
            키위 이름 <span className="text-xs text-destructive">*</span>
          </Label>
          {nameError && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3" />
              키위 이름을 입력해주세요
            </span>
          )}
        </div>
        <Input
          id="kiwi-name"
          placeholder="키위 이름을 입력하세요"
          value={kiwiName}
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_NAME", payload: e.target.value })
          }
          className={nameError ? "border-destructive" : ""}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="kiwi-description" className="flex items-center gap-1">
            키위 설명
          </Label>
        </div>
        <Input
          id="kiwi-description"
          placeholder="키위에 대한 설명을 입력하세요"
          value={kiwiDescription}
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_DESCRIPTION", payload: e.target.value })
          }
        />
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Label htmlFor="password-protection">암호 설정</Label>
        <Switch
          id="password-protection"
          checked={passwordProtected}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_PASSWORD_PROTECTED", payload: checked })
          }
        />
      </div>

      {passwordProtected && (
        <div className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="flex items-center gap-1">
                암호 <span className="text-xs text-destructive">*</span>
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="암호를 입력하세요"
              value={password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              className={passwordError ? "border-destructive" : ""}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="confirm-password"
                className="flex items-center gap-1"
              >
                암호 확인
              </Label>
              {passwordError && (
                <span className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="size-3" />
                  암호가 일치하지 않습니다
                </span>
              )}
            </div>
            <Input
              id="confirm-password"
              type="password"
              placeholder="암호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "SET_CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
              className={passwordError ? "border-destructive" : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EpubUploadForm({ state, dispatch }: StateDispatchProps) {
  const { fileError } = state;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({ type: "SET_SELECTED_FILE", payload: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="epub-file" className="flex items-center gap-1">
            EPUB 파일 <span className="text-xs text-destructive">*</span>
          </Label>
          {fileError && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3" />
              파일을 선택해주세요
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Input
            id="epub-file"
            type="file"
            accept=".epub"
            className={`flex h-10 ${fileError ? "border-destructive" : ""}`}
            onChange={handleFileChange}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          키위에서 사용할 EPUB 파일을 선택해주세요.
        </p>
      </div>
    </div>
  );
}

function KiwiCreatedSuccess({ state, dispatch }: StateDispatchProps) {
  const { kiwiName, shareCode, copied } = state;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(shareCode).then(() => {
      dispatch({ type: "SET_COPIED", payload: true });
      setTimeout(() => dispatch({ type: "SET_COPIED", payload: false }), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Check className="size-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium">{kiwiName} 키위가 생성되었습니다!</h3>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Input
            value={shareCode}
            readOnly
            className="pr-10 text-center font-mono"
          />
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleCopyCode}
          className="flex size-10 shrink-0 items-center justify-center"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        이 코드를 사용해 다른 사람들이 키위에 참여할 수 있습니다.
      </p>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-lg font-medium">키위를 만들고 있습니다</h3>
        <p className="text-sm text-muted-foreground">
          EPUB 파일을 처리하고 있습니다
        </p>
      </div>
    </div>
  );
}
