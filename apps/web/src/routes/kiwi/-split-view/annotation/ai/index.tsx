import { memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import NotSelected from "./not-selected";
import Selected from "./selected";

import { selectedHighlightAtom } from "#/routes/kiwi/-reader/atoms";

function AiChatTab() {
  const selectedHighlight = useAtomValue(selectedHighlightAtom);

  if (!selectedHighlight) {
    return <NotSelected />;
  }

  return <Selected key={selectedHighlight.id} highlight={selectedHighlight} />;
}

export default memo(AiChatTab);
