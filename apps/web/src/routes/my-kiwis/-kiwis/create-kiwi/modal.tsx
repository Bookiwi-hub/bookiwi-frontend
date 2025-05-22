import { Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";

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

interface CreateKiwiModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateKiwiModal({
  open,
  setOpen,
}: CreateKiwiModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [kiwiName, setKiwiName] = useState("");
  const [kiwiDescription, setKiwiDescription] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    if (passwordProtected && password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 3) {
      // 완료 단계에서는 첫 단계로 돌아감
      handleClose();
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setKiwiName("");
    setKiwiDescription("");
    setPasswordProtected(false);
    setPassword("");
    setConfirmPassword("");
    setSelectedFile(null);
    setShareCode("");
    setCopied(false);
    setOpen(false);
  };

  const handleSubmit = async () => {
    // 로딩 시작
    setIsLoading(true);

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
      setShareCode(generatedShareCode);

      // 3단계로 이동
      setStep(3);
    } catch (error) {
      console.error("키위 생성 중 오류 발생:", error);
      // 오류 처리 로직 추가 가능
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(shareCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // 각 단계별 타이틀 및 설명 텍스트
  const getDialogTitle = () => {
    if (step === 3) return "키위 생성 완료";
    return "새로운 키위 만들기";
  };

  const getDialogDescription = () => {
    if (step === 1)
      return "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.";
    if (step === 2) return "키위에서 사용할 EPUB 파일을 업로드하세요.";
    return "아래 공유 코드를 사용해 친구들을 초대하세요.";
  };

  // 현재 단계에 맞는 컨텐츠 렌더링
  const renderContent = () => {
    if (step === 1) {
      return (
        <KiwiInfoForm
          kiwiName={kiwiName}
          setKiwiName={setKiwiName}
          kiwiDescription={kiwiDescription}
          setKiwiDescription={setKiwiDescription}
          passwordProtected={passwordProtected}
          setPasswordProtected={setPasswordProtected}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordError={passwordError}
        />
      );
    }

    if (step === 2) {
      return <EpubUploadForm onFileChange={setSelectedFile} />;
    }

    return (
      <div className="flex flex-col items-center space-y-4 py-8">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">
          {kiwiName} 키위가 생성되었습니다!
        </h3>
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
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          이 코드를 사용해 다른 사람들이 키위에 참여할 수 있습니다.
        </p>
      </div>
    );
  };

  // 각 단계별 푸터 버튼 렌더링
  const renderFooterButtons = () => {
    if (step === 1) {
      return (
        <Button onClick={handleNext} className="ml-auto">
          다음
        </Button>
      );
    }

    if (step === 2) {
      return (
        <>
          <Button variant="outline" onClick={handleBack}>
            이전
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                처리 중...
              </>
            ) : (
              "만들기"
            )}
          </Button>
        </>
      );
    }

    return (
      <Button onClick={handleClose} className="ml-auto">
        완료
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        {renderContent()}

        <DialogFooter className="sm:justify-between">
          {renderFooterButtons()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface KiwiInfoFormProps {
  kiwiName: string;
  setKiwiName: (value: string) => void;
  kiwiDescription: string;
  setKiwiDescription: (value: string) => void;
  passwordProtected: boolean;
  setPasswordProtected: (value: boolean) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  passwordError: boolean;
}

function KiwiInfoForm({
  kiwiName,
  setKiwiName,
  kiwiDescription,
  setKiwiDescription,
  passwordProtected,
  setPasswordProtected,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordError,
}: KiwiInfoFormProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="kiwi-name">키위 이름</Label>
        <Input
          id="kiwi-name"
          placeholder="키위 이름을 입력하세요"
          value={kiwiName}
          onChange={(e) => setKiwiName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kiwi-description">키위 설명</Label>
        <Input
          id="kiwi-description"
          placeholder="키위에 대한 설명을 입력하세요"
          value={kiwiDescription}
          onChange={(e) => setKiwiDescription(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Label htmlFor="password-protection">암호 설정</Label>
        <Switch
          id="password-protection"
          checked={passwordProtected}
          onCheckedChange={setPasswordProtected}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">암호 확인</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="암호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

interface EpubUploadFormProps {
  onFileChange?: (file: File) => void;
}

function EpubUploadForm({ onFileChange }: EpubUploadFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileChange) {
      onFileChange(e.target.files[0]);
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
