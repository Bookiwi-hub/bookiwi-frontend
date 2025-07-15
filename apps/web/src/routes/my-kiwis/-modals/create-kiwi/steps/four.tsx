import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { primaryColor } from "@bookiwi/color";
import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { closeCreateKiwiModalAtom } from "../../atoms";
import { createKiwiAtom } from "../atoms";

import { Button } from "#/components/ui/button";
import { DialogFooter } from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";

function StepFour() {
  const newKiwi = useAtomValue(createKiwiAtom);
  const [copied, setCopied] = useState(false);
  const closeCreateKiwiModal = useSetAtom(closeCreateKiwiModalAtom);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(newKiwi.shareCode || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 py-8">
        <div
          className="flex size-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: primaryColor,
          }}
        >
          <Check className="size-6 text-slate-600" />
        </div>
        <h3 className="text-lg font-medium">
          {newKiwi.kiwiName} 키위가 생성되었습니다!
        </h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Input
              value={newKiwi.shareCode || "공유 코드가 생성되지 않았습니다."}
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
      <DialogFooter className="sm:justify-between">
        <Button onClick={closeCreateKiwiModal} className="ml-auto">
          완료
        </Button>
      </DialogFooter>
    </>
  );
}

export default StepFour;
