import { memo } from "react";

import { useAtom } from "@bookiwi/jotai";

import { tabStateAtom, TabType } from "./atoms";
import AnnotationHeader from "./header";
import Highlight from "./tabs/highlight";
import HighlightList from "./tabs/highlight-list";

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
        value={TabType.HIGHLIGHT}
        className="relative min-h-0 w-full flex-1"
      >
        <Highlight />
      </TabsContent>
      <TabsContent
        value={TabType.HIGHLIGHT_LIST}
        className="relative min-h-0 w-full flex-1"
      >
        <HighlightList />
      </TabsContent>
    </Tabs>
  );
}

export default memo(Annotation);
