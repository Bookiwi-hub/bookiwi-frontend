import { Plus, Link2 } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
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

export function CreateKiwiModal({ open, setOpen }: CreateKiwiModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [kiwiName, setKiwiName] = useState("");
  const [kiwiDescription, setKiwiDescription] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // Handle form submission

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
                <Input
                  id="password"
                  type="password"
                  placeholder="암호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="epub-file">EPUB 파일</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="epub-file"
                  type="file"
                  accept=".epub"
                  className="flex h-10"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                키위에서 사용할 EPUB 파일을 선택해주세요.
              </p>
            </div>
          </div>
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
              <Button type="submit" onClick={handleSubmit}>
                만들기
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CreateKiwiCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        className="group min-h-[300px] w-full cursor-pointer border border-dashed bg-card/50 transition-all duration-300 hover:border-primary/70 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/20"
        onClick={() => setOpen(true)}
      >
        <CardContent className="flex h-full flex-col items-center justify-center gap-6 p-8">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <Plus size={30} strokeWidth={2} />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="text-lg font-medium tracking-tight">
              새로운 키위 만들기
            </h3>
            <p className="max-w-[80%] text-sm text-muted-foreground">
              책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.
            </p>
          </div>
        </CardContent>
      </Card>
      <CreateKiwiModal open={open} setOpen={setOpen} />
    </>
  );
}

export function CreateKiwiButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 mobile:hidden"
        onClick={() => setOpen(true)}
      >
        <Plus size={16} />새 키위 만들기
      </Button>
      <CreateKiwiModal open={open} setOpen={setOpen} />
    </>
  );
}

export function KiwiLinkForm() {
  return (
    <form
      className="flex items-center gap-2 mobile:w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-2 rounded-md border bg-white px-2 mobile:w-full">
        <Link2 size={16} className="text-muted-foreground" />
        <Input
          type="url"
          placeholder="링크로 키위 참여하기"
          className="w-[240px] border-0 bg-transparent p-2 focus-visible:ring-0 mobile:w-full"
        />
      </div>
      <Button type="submit" variant="default" size="default">
        참여
      </Button>
    </form>
  );
}
