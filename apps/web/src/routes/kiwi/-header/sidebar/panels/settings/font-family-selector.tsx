import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

interface FontFamilySelectorProps {
  fontFamily: string | undefined;
  setFontFamily: (value?: string) => Promise<void> | void;
}

function FontFamilySelector({
  fontFamily,
  setFontFamily,
}: FontFamilySelectorProps) {
  const handleFontFamilyChange = async (value: string) => {
    if (value === "original") {
      await setFontFamily(undefined);
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
        <SelectTrigger>
          <SelectValue placeholder="원본" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectItem value="original">원본</SelectItem>
          <SelectItem value="sans-serif">Sans-serif</SelectItem>
          <SelectItem value="serif">Serif</SelectItem>
          <SelectItem value="monospace">Monospace</SelectItem>
          <SelectItem value="arial">Arial</SelectItem>
          <SelectItem value="helvetica">Helvetica</SelectItem>
          <SelectItem value="verdana">Verdana</SelectItem>
          <SelectItem value="tahoma">Tahoma</SelectItem>
          <SelectItem value="trebuchet-ms">Trebuchet MS</SelectItem>
          <SelectItem value="times-new-roman">Times New Roman</SelectItem>
          <SelectItem value="georgia">Georgia</SelectItem>
          <SelectItem value="courier-new">Courier New</SelectItem>
          <SelectItem value="impact">Impact</SelectItem>
          <SelectItem value="malgun-gothic">맑은 고딕</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FontFamilySelector;
