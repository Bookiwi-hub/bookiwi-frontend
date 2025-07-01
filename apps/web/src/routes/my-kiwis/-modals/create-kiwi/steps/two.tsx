import { Check, Copy } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

import { useAtom, useSetAtom } from "@bookiwi/jotai";

import { fileAtom, stepAtom } from "../atoms";
import { Step } from "../types";

import { Button } from "#/components/ui/button";
import { DialogFooter } from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { cn } from "#/lib/utils";
import userManager from "#/managers/user";

function StepTwo() {
  const [selectedFile, setSelectedFile] = useAtom(fileAtom);
  const [error, setError] = useState(false);
  const setStep = useSetAtom(stepAtom);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith(".epub")) {
        setSelectedFile(file);
        setError(false); // 에러 상태 리셋
      } else {
        setError(true);
        toast.error("EPUB 파일만 업로드할 수 있습니다.");
        setSelectedFile(null);
        e.target.value = "";
      }
    }
  };

  const handleBack = () => {
    setStep(Step.One);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      if (userManager.isGuest()) {
        toast.error("게스트 유저는 키위를 만들 수 없습니다.");
      } else {
        setStep(Step.Three);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="space-y-6 py-4">
        <div className="w-full items-center">
          <div className="mb-2 flex items-center justify-between">
            <Label
              htmlFor="epub-file"
              className="flex items-center gap-1 font-medium"
            >
              EPUB 파일 <span className="text-xs text-destructive">*</span>
            </Label>
          </div>
          {!selectedFile && (
            <button
              type="button"
              className={cn(
                "w-full cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/20",
                error
                  ? "border-destructive bg-destructive/5"
                  : "border-muted-foreground/20",
              )}
              onClick={() => document.getElementById("epub-file")?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Copy className="size-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    EPUB 파일을 업로드하세요
                  </p>
                </div>
              </div>
              <Input
                id="epub-file"
                type="file"
                accept=".epub"
                className="hidden"
                onChange={handleFileChange}
              />
            </button>
          )}

          {selectedFile && (
            <div className="mb-2 rounded-md border border-border bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="max-w-[180px] truncate text-sm font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  변경
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DialogFooter className="sm:justify-between">
        <Button variant="outline" onClick={handleBack}>
          이전
        </Button>
        <Button onClick={handleSubmit}>만들기</Button>
      </DialogFooter>
    </>
  );
}

export default StepTwo;
