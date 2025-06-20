import { useAtomValue } from "@bookiwi/jotai";

import Annotation from "./annotation";
import NotSelected from "./not-selected";

import { primaryColor } from "#/constants/color";
import { selectedAnnotationAtom } from "#/routes/kiwi/-reader/atoms/annotations";
import { participantColorAtom } from "#/routes/kiwi/-reader/atoms/participants";

function Highlight() {
  const selectedAnnotation = useAtomValue(selectedAnnotationAtom);
  const participantColor = useAtomValue(participantColorAtom);

  if (!selectedAnnotation)
    return <NotSelected color={participantColor ?? primaryColor} />;

  return <Annotation annotation={selectedAnnotation} />;
}

export default Highlight;
