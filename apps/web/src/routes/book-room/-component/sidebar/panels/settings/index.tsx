import ButtonController from "./button-controller";
import FontFamilySelector from "./font-family-selector";
import SinglePageToggler from "./single-page-toggler";

import { Separator } from "#/components/ui/separator";
import { useSettings } from "#/routes/book-room/-reader/settings-context";

function SettingsPanel() {
  const {
    isSinglePage,
    setIsSinglePage,
    fontSize,
    setFontSize,
    fontWeight,
    setFontWeight,
    lineHeight,
    setLineHeight,
  } = useSettings();
  return (
    <div>
      <h3 className="mb-8 text-lg font-medium">설정</h3>
      <div className="flex flex-col gap-6">
        <SinglePageToggler
          isSinglePage={isSinglePage}
          handleCheckedChange={setIsSinglePage}
        />
        <Separator />
        <FontFamilySelector />
        <ButtonController
          label="글자 크기"
          value={fontSize}
          setValue={setFontSize}
          defaultLabel="원본"
          initialValue={16}
          min={8}
          max={30}
          step={1}
        />
        <ButtonController
          label="글자 두께"
          value={fontWeight}
          setValue={setFontWeight}
          defaultLabel="원본"
          initialValue={100}
          min={100}
          max={900}
          step={100}
        />
        <ButtonController
          label="문단 간격"
          value={lineHeight}
          setValue={setLineHeight}
          defaultLabel="원본"
          initialValue={1}
          min={1}
          max={5}
          step={0.1}
          formatValue={(val) => Number(val).toFixed(1)}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
