import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";
import { Switch } from "#/components/ui/switch";
import { useSettings } from "#/routes/book-room/-reader/settings-context";

function SinglePageToggle() {
  const { isSinglePage, setIsSinglePage } = useSettings();

  const handleCheckedChange = (checked: boolean) => {
    setIsSinglePage(checked);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">한 페이지로 보기</span>
      <Switch
        id="theme-switch"
        checked={isSinglePage}
        onCheckedChange={handleCheckedChange}
      />
    </div>
  );
}

function FontFamilySelect() {
  const [value, setValue] = useState("original");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">글꼴</span>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="원본" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pretandard">pretandard</SelectItem>
          <SelectItem value="original">원본</SelectItem>
          <SelectItem value="human">휴먼명조</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function FontSizeSetting() {
  const { fontSize, setFontSize } = useSettings();

  const defaultLabel = "원본";
  const initialStep = 16;
  const min = 8;
  const step = 1;

  const handleChange = async (action: "increase" | "decrease" | "reset") => {
    if (action === "reset") {
      await setFontSize(undefined);
      return;
    }

    const currentValue = fontSize ?? initialStep;
    if (action === "increase") {
      await setFontSize(currentValue + step);
    } else {
      await setFontSize(Math.max(min, currentValue - step));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">글자 크기</span>
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
            {fontSize || defaultLabel}
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
          >
            <RotateCcwIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function LineHeightSetting() {
  const { lineHeight, setLineHeight } = useSettings();
  const defaultLabel = "원본";
  const initialValue = 1;
  const min = 1;
  const step = 0.1;

  const handleChange = (action: "increase" | "decrease" | "reset") => {
    if (action === "reset") {
      setLineHeight(undefined);
      return;
    }

    const currentValue = lineHeight ?? initialValue;
    if (action === "increase") {
      setLineHeight(Number((currentValue + step).toFixed(1)));
    } else {
      setLineHeight(Number(Math.max(min, currentValue - step).toFixed(1)));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">문단 간격</span>
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
            {lineHeight || defaultLabel}
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

function SettingsPanel() {
  return (
    <div>
      <h3 className="mb-8 text-lg font-medium">설정</h3>
      <div className="flex flex-col gap-6">
        <SinglePageToggle />
        <Separator />
        <FontFamilySelect />
        <FontSizeSetting />
        <LineHeightSetting />
      </div>
    </div>
  );
}

export default SettingsPanel;
