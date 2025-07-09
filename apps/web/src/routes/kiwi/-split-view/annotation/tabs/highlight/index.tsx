import { primaryColor } from "@bookiwi/color";
import { useAtomValue } from "@bookiwi/jotai";

import Annotation from "./annotation";
import NotSelected from "./not-selected";

import {
  participantColorAtom,
  selectedAnnotationAtom,
} from "#/routes/kiwi/-reader/atoms";

function Highlight() {
  const selectedAnnotation = useAtomValue(selectedAnnotationAtom);
  const participantColor = useAtomValue(participantColorAtom);

  if (!selectedAnnotation)
    return <NotSelected color={participantColor ?? primaryColor} />;

  return <Annotation annotation={selectedAnnotation} />;
}

export default Highlight;
