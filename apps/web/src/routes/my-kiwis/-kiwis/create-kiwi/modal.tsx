import { Copy, Check, Loader2 } from "lucide-react";
import { Dispatch, useReducer } from "react";

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
  selectedFile: File | null;
  isLoading: boolean;
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
  | { type: "SET_SELECTED_FILE"; payload: File | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SHARE_CODE"; payload: string }
  | { type: "SET_COPIED"; payload: boolean }
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
  selectedFile: null,
  isLoading: false,
  shareCode: "",
  copied: false,
};

// 리듀서 함수
const kiwiReducer = (state: KiwiState, action: KiwiAction): KiwiState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_KIWI_NAME":
      return { ...state, kiwiName: action.payload };
    case "SET_KIWI_DESCRIPTION":
      return { ...state, kiwiDescription: action.payload };
    case "SET_PASSWORD_PROTECTED":
      return { ...state, passwordProtected: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "SET_SELECTED_FILE":
      return { ...state, selectedFile: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SHARE_CODE":
      return { ...state, shareCode: action.payload };
    case "SET_COPIED":
      return { ...state, copied: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
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

  const { step, selectedFile, isLoading } = state;

  const handleNext = () => {
    const { passwordProtected, password, confirmPassword } = state;
    if (passwordProtected && password !== confirmPassword) {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: true });
      return;
    }
    dispatch({ type: "SET_PASSWORD_ERROR", payload: false });
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
    dispatch({ type: "SET_STEP", payload: 3 }); // 로딩 단계로 전환
    dispatch({ type: "SET_LOADING", payload: true });

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
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const Titles = {
    1: "새로운 키위 만들기",
    2: "새로운 키위 만들기",
    3: "키위 처리 중",
    4: "키위 생성 완료",
  };

  const Descriptions = {
    1: "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.",
    2: "키위에서 사용할 EPUB 파일을 업로드하세요.",
    3: "EPUB 파일을 처리하고 키위를 생성하는 중입니다...",
    4: "아래 공유 코드를 사용해 친구들을 초대하세요.",
  };

  const Contents = {
    1: <KiwiInfoForm state={state} dispatch={dispatch} />,
    2: <EpubUploadForm dispatch={dispatch} />,
    3: <LoadingScreen state={state} />,
    4: <KiwiCreatedSuccess state={state} dispatch={dispatch} />,
  };

  const Footers = {
    1: (
      <Button onClick={handleNext} className="ml-auto">
        다음
      </Button>
    ),
    2: (
      <>
        <Button variant="outline" onClick={handleBack}>
          이전
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
        >
          만들기
        </Button>
      </>
    ),
    3: null, // 로딩 화면에서는 footer 버튼 없음
    4: (
      <Button onClick={handleClose} className="ml-auto">
        완료
      </Button>
    ),
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>{Titles[step]}</DialogTitle>
          <DialogDescription>{Descriptions[step]}</DialogDescription>
        </DialogHeader>

        {Contents[step]}

        <DialogFooter className="sm:justify-between">
          {Footers[step]}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
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
  } = state;

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="kiwi-name">키위 이름</Label>
        <Input
          id="kiwi-name"
          placeholder="키위 이름을 입력하세요"
          value={kiwiName}
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_NAME", payload: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kiwi-description">키위 설명</Label>
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
            <Label htmlFor="password">암호</Label>
            <Input
              id="password"
              type="password"
              placeholder="암호를 입력하세요"
              value={password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">암호 확인</Label>
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
            />
          </div>
          {passwordError && (
            <p className="text-sm text-destructive">
              암호가 일치하지 않습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function EpubUploadForm({ dispatch }: { dispatch: Dispatch<KiwiAction> }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({ type: "SET_SELECTED_FILE", payload: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="epub-file">EPUB 파일</Label>
        <div className="flex items-center gap-2">
          <Input
            id="epub-file"
            type="file"
            accept=".epub"
            className="flex h-10"
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

function LoadingScreen({ state }: { state: KiwiState }) {
  const { kiwiName } = state;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-lg font-medium">
          {kiwiName} 키위를 만들고 있습니다
        </h3>
        <p className="text-sm text-muted-foreground">
          EPUB 파일을 처리하고 있습니다
        </p>
      </div>
    </div>
  );
}
