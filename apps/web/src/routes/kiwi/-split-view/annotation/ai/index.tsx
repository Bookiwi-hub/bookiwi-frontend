import { memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import NotSelected from "./not-selected";
import Selected from "./selected";

import { selectedTextAtom } from "#/routes/kiwi/-reader/atoms";

function AiChatTab() {
  const selectedText = useAtomValue(selectedTextAtom);

  if (!selectedText) {
    return <NotSelected />;
  }

  return <Selected key={selectedText} text={selectedText} />;
}

export default memo(AiChatTab);
