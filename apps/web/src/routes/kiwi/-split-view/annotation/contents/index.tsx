import { memo } from "react";

import { primaryColor } from "@bookiwi/color";
import { useAtomValue } from "@bookiwi/jotai";

import NotSelected from "./not-selected";
import Selected from "./selected";

import {
  participantColorAtom,
  selectedHighlightAtom,
} from "#/routes/kiwi/-reader/atoms";

function Annotation() {
  const selectedHighlight = useAtomValue(selectedHighlightAtom);
  const participantColor = useAtomValue(participantColorAtom);

  return (
    <div className="relative min-h-0 w-full flex-1">
      {selectedHighlight ? (
        <Selected highlight={selectedHighlight} />
      ) : (
        <NotSelected color={participantColor ?? primaryColor} />
      )}
    </div>
  );
}

export default memo(Annotation);
