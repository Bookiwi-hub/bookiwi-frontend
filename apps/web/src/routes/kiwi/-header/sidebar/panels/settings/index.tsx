import {
  fontFamilyAtom,
  fontSizeAtom,
  fontWeightAtom,
  isSinglePageAtom,
  lineHeightAtom,
  useAtomValue,
  useSetAtom,
} from "@bookiwi/jotai";

import ButtonController from "./button-controller";
import FontFamilySelector from "./font-family-selector";
import SinglePageToggler from "./single-page-toggler";

import { Separator } from "#/components/ui/separator";
import {
  setFontWeightAtom,
  setFontFamilyAtom,
  setIsSinglePageAtom,
  setLineHeightAtom,
  setFontSizeAtom,
} from "#/routes/kiwi/-reader/atoms/settings";

function SettingsPanel() {
  const isSinglePage = useAtomValue(isSinglePageAtom);
  const fontFamily = useAtomValue(fontFamilyAtom);
  const fontSize = useAtomValue(fontSizeAtom);
  const fontWeight = useAtomValue(fontWeightAtom);
  const lineHeight = useAtomValue(lineHeightAtom);
  const setIsSinglePage = useSetAtom(setIsSinglePageAtom);
  const setFontFamily = useSetAtom(setFontFamilyAtom);
  const setFontSize = useSetAtom(setFontSizeAtom);
  const setFontWeight = useSetAtom(setFontWeightAtom);
  const setLineHeight = useSetAtom(setLineHeightAtom);

  return (
    <div>
      <h3 className="mb-8 text-lg font-medium">설정</h3>
      <div className="flex flex-col gap-6">
        <SinglePageToggler
          isSinglePage={isSinglePage}
          handleCheckedChange={setIsSinglePage}
        />
        <Separator />
        <FontFamilySelector
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
        />
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
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
