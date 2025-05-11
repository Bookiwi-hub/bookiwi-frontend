import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { memo } from "react";

import { Button } from "#/components/ui/button";

interface ButtonControllerProps<T> {
  label: string;
  value: T | undefined;
  setValue: (value: T | undefined) => Promise<void> | void;
  defaultLabel: string;
  initialValue: T;
  min: T;
  max: T;
  step: number;
  formatValue?: (value: T) => string | number;
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
  formatValue = (val) => val,
}: ButtonControllerProps<T>) {
  const handleChange = async (action: "increase" | "decrease" | "reset") => {
    if (action === "reset") {
      await setValue(undefined);
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
          >
            <MinusIcon className="size-4" />
          </Button>
          <div className="min-w-14 px-2 text-center text-sm">
            {value !== undefined ? formatValue(value) : defaultLabel}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none"
            onClick={() => handleChange("increase")}
          >
            <PlusIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none border-l"
            onClick={() => handleChange("reset")}
            title={`${defaultLabel}으로`}
          >
            <RotateCcwIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ButtonController);
