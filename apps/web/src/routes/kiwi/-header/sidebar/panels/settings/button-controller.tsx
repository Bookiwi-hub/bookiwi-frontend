import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "#/components/ui/button";

interface ButtonControllerProps<T> {
  label: string;
  value: T | null;
  setValue: (value: T | null) => Promise<void> | void;
  defaultLabel: string;
  initialValue: T;
  min: T;
  max: T;
  step: number;
}

function ButtonController<T extends number>({
  label,
  value,
  setValue,
  defaultLabel,
  initialValue,
  min,
  max,
  step,
}: ButtonControllerProps<T>) {
  const handleChange = async (action: "increase" | "decrease" | "reset") => {
    if (action === "reset") {
      await setValue(null);
      return;
    }

    const currentValue = value ?? initialValue;
    if (action === "increase") {
      const newValue = Number(Math.min(max, currentValue + step));
      await setValue(newValue as T);
    } else {
      const newValue = Number(Math.max(min, currentValue - step));
      await setValue(newValue as T);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-1 overflow-hidden rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none"
            onClick={() => handleChange("decrease")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <MinusIcon className="size-4" />
          </Button>
          <div className="min-w-14 px-2 text-center text-sm">
            {value !== null ? value : defaultLabel}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none"
            onClick={() => handleChange("increase")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <PlusIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none border-l"
            onClick={() => handleChange("reset")}
            title={`${defaultLabel}으로 초기화`}
            onMouseDown={(e) => e.preventDefault()}
          >
            <RotateCcwIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ButtonController;
