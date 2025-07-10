import { primaryColor } from "@bookiwi/color";
import { useAtomValue } from "@bookiwi/jotai";

import Annotation from "./annotation";
import NotSelected from "./not-selected";

import {
  participantColorAtom,
  selectedHighlightAtom,
} from "#/routes/kiwi/-reader/atoms";

function Highlight() {
  const selectedHighlight = useAtomValue(selectedHighlightAtom);
  const participantColor = useAtomValue(participantColorAtom);

  if (!selectedHighlight)
    return <NotSelected color={participantColor ?? primaryColor} />;

  return <Annotation highlight={selectedHighlight} />;
}

export default Highlight;
