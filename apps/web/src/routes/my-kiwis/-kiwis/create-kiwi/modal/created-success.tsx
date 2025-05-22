import { Copy, Check } from "lucide-react";

import { StateDispatchProps } from "./reducer";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

function CreatedSuccess({ state, dispatch }: StateDispatchProps) {
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

export default CreatedSuccess;
