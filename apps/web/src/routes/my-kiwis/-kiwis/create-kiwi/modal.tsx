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
  const [step, setStep] = useState<1 | 2>(1);
  const [kiwiName, setKiwiName] = useState("");
  const [kiwiDescription, setKiwiDescription] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleNext = () => {
    if (passwordProtected && password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      kiwiName,
      kiwiDescription,
      passwordProtected,
      password,
      selectedFile,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>새로운 키위 만들기</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요."
              : "키위에서 사용할 EPUB 파일을 업로드하세요."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
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
        ) : (
          <EpubUploadForm onFileChange={setSelectedFile} />
        )}

        <DialogFooter className="sm:justify-between">
          {step === 1 ? (
            <Button onClick={handleNext} className="ml-auto">
              다음
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack}>
                이전
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!selectedFile}
              >
                만들기
              </Button>
            </>
          )}
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
