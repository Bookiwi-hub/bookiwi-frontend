import { Rendition } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

import { useReading } from "../reading-context";
import { useSettings } from "../settings-context";
import { updateCustomStyle } from "../styles";

const useRendered = () => {
  const { setCurrentSection } = useReading();
  const { fontSize, fontFamily, fontWeight, lineHeight } = useSettings();

  const getHandlerOnRendered = (rendition: Rendition) => {
    const handleRendered = async (section: Section) => {
      setCurrentSection(section);
      const contents = rendition.getContents()[0];
      if (contents) {
        await updateCustomStyle(contents, {
          fontSize,
          fontFamily,
          fontWeight,
          lineHeight,
        });
      }
    };

    return handleRendered;
  };

  return getHandlerOnRendered;
};

export default useRendered;
