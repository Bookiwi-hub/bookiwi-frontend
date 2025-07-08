import { primaryColor } from "@bookiwi/color";
import { useAtomValue } from "@bookiwi/jotai";

import Annotation from "./annotation";
import NotSelected from "./not-selected";

import { participantInfoAtom } from "#/routes/kiwi/-reader/atoms";
import { selectedAnnotationAtom } from "#/routes/kiwi/-reader/atoms/annotations";

function Highlight() {
  const selectedAnnotation = useAtomValue(selectedAnnotationAtom);
  const participantInfo = useAtomValue(participantInfoAtom);

  if (!selectedAnnotation || !participantInfo)
    return <NotSelected color={participantInfo?.color ?? primaryColor} />;

  return <Annotation annotation={selectedAnnotation} />;
}

export default Highlight;
