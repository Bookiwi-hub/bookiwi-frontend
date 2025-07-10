import { memo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

interface FontFamilySelectorProps {
  fontFamily: string | null;
  setFontFamily: (value: string | null) => Promise<void> | void;
}

const fontOptions = [
  { value: "original", label: "원본" },
  { value: "sans-serif", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "arial", label: "Arial" },
  { value: "helvetica", label: "Helvetica" },
  { value: "verdana", label: "Verdana" },
  { value: "tahoma", label: "Tahoma" },
  { value: "trebuchet-ms", label: "Trebuchet MS" },
  { value: "times-new-roman", label: "Times New Roman" },
  { value: "georgia", label: "Georgia" },
  { value: "courier-new", label: "Courier New" },
  { value: "impact", label: "Impact" },
  { value: "malgun-gothic", label: "맑은 고딕" },
];

function FontFamilySelector({
  fontFamily,
  setFontFamily,
}: FontFamilySelectorProps) {
  const handleFontFamilyChange = async (value: string) => {
    if (value === "original") {
      await setFontFamily(null);
    } else {
      await setFontFamily(value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">글꼴</span>
      <Select
        value={fontFamily || "original"}
        onValueChange={handleFontFamilyChange}
      >
        <SelectTrigger onKeyDown={(e) => e.preventDefault()}>
          <SelectValue placeholder="원본" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {fontOptions.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default memo(FontFamilySelector);
