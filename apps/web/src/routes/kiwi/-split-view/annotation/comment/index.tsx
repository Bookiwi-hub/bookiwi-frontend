import { memo } from "react";

import { primaryColor } from "@bookiwi/color";
import { useAtomValue } from "@bookiwi/jotai";

import NotSelected from "./not-selected";
import Selected from "./selected";

import {
  participantColorAtom,
  selectedHighlightAtom,
} from "#/routes/kiwi/-reader/atoms";

function CommentTab() {
  const selectedHighlight = useAtomValue(selectedHighlightAtom);
  const participantColor = useAtomValue(participantColorAtom);

  if (!selectedHighlight) {
    return <NotSelected color={participantColor ?? primaryColor} />;
  }

  return <Selected highlight={selectedHighlight} />;
}

export default memo(CommentTab);
