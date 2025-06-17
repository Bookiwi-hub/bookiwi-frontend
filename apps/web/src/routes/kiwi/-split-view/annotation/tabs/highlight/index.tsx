import { useAtomValue } from "@bookiwi/jotai";

import Comment from "./comment";
import NotSelected from "./not-selected";

import { primaryColor } from "#/DB/color";
import { selectedAnnotationAtom } from "#/routes/kiwi/-reader/atoms/annotations";
import { participantColorAtom } from "#/routes/kiwi/-reader/atoms/participants";

function Highlight() {
  const selectedAnnotation = useAtomValue(selectedAnnotationAtom);
  const participantColor = useAtomValue(participantColorAtom);

  if (!selectedAnnotation)
    return <NotSelected color={participantColor ?? primaryColor} />;

  return <Comment selectedAnnotation={selectedAnnotation} />;
}

export default Highlight;
