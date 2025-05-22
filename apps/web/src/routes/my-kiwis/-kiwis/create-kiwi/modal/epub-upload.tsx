import { AlertCircle, Check, Copy } from "lucide-react";

import { useCreateKiwi } from "./context";
import { ActionTypes } from "./reducer";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { cn } from "#/lib/utils";

function EpubUpload() {
  const { state, dispatch } = useCreateKiwi();
  const { fileError, selectedFile } = state;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({
        type: ActionTypes.SET_SELECTED_FILE,
        payload: e.target.files[0],
      });
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="w-full items-center">
        <div className="mb-2 flex items-center justify-between">
          <Label
            htmlFor="epub-file"
            className="flex items-center gap-1 font-medium"
          >
            EPUB 파일 <span className="text-xs text-destructive">*</span>
          </Label>
          {fileError && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3" />
              파일을 선택해주세요
            </span>
          )}
        </div>

        {selectedFile ? (
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
                onClick={() =>
                  dispatch({
                    type: ActionTypes.SET_SELECTED_FILE,
                    payload: null,
                  })
                }
              >
                변경
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={cn(
              "w-full cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/20",
              fileError
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
                  EPUB 파일을 드래그하거나 클릭하여 업로드하세요
                </p>
                <p className="text-xs text-muted-foreground">최대 10MB</p>
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

        <p className="mt-2 text-sm text-muted-foreground">
          키위에서 사용할 EPUB 파일을 선택해주세요. 파일은 안전하게 저장됩니다.
        </p>
      </div>
    </div>
  );
}

export default EpubUpload;
