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
import { useReader } from "#/routes/book-room/-reader";
import { useSettings } from "#/routes/book-room/-reader/settings-context";

function SinglePageToggle() {
  const { isSinglePage, setIsSinglePage } = useSettings();
  const { book } = useReader();

  const handleCheckedChange = (checked: boolean) => {
    if (!book) return;
    if (checked) {
      book.rendition.spread("none");
      setIsSinglePage(true);
    } else {
      book.rendition.spread("auto", 800);
      setIsSinglePage(false);
    }
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
  const [value, setValue] = useState<"default" | number>("default");
  const defaultLabel = "원본";
  const initialStep = 16;
  const min = 8;
  const step = 1;

  const handleChange = (action: "increase" | "decrease" | "reset") => {
    if (action === "reset") {
      setValue("default");
      return;
    }

    const currentValue = value === "default" ? initialStep : value;
    if (action === "increase") {
      setValue(currentValue + step);
    } else {
      setValue(Math.max(min, currentValue - step));
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
            {value === "default" ? defaultLabel : value}
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

function ParagraphSpacingSetting() {
  const [value, setValue] = useState<"default" | number>("default");
  const defaultLabel = "원본";
  const initialValue = 1.5;
  const min = 1;
  const step = 0.1;

  const handleChange = (action: "increase" | "decrease" | "reset") => {
    if (action === "reset") {
      setValue("default");
      return;
    }

    const currentValue = value === "default" ? initialValue : value;
    if (action === "increase") {
      setValue(Number((currentValue + step).toFixed(1)));
    } else {
      setValue(Number(Math.max(min, currentValue - step).toFixed(1)));
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
            {value === "default" ? defaultLabel : value}
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
        <ParagraphSpacingSetting />
      </div>
    </div>
  );
}

export default SettingsPanel;
