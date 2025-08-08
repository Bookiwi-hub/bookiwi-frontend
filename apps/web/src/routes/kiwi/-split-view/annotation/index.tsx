import { memo } from "react";

import { useAtom } from "@bookiwi/jotai";

import AiChatTab from "./ai";
import { tabStateAtom, TabType } from "./atoms";
import CommentTab from "./comment";
import AnnotationHeader from "./header";

import { Tabs, TabsContent } from "#/components/ui/tabs";

function Annotation() {
  const [tabState, setTabState] = useAtom(tabStateAtom);

  return (
    <Tabs
      value={tabState}
      onValueChange={(value) => setTabState(value as TabType)}
      className="flex h-full flex-col shadow-2xl"
    >
      <AnnotationHeader />
      <TabsContent
        value={TabType.COMMENT}
        className="relative min-h-0 w-full flex-1"
      >
        <CommentTab />
      </TabsContent>
      <TabsContent
        value={TabType.AI}
        className="relative min-h-0 w-full flex-1"
      >
        <AiChatTab />
      </TabsContent>
    </Tabs>
  );
}

export default memo(Annotation);
