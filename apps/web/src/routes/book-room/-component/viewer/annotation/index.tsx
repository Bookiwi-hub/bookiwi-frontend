import AnnotationHeader from "./header";
import Highlight from "./tabs/highlight";
import HighlightList from "./tabs/highlight-list";
import { AnnotationTab } from "./tabs/tab";

import { Tabs, TabsContent } from "#/components/ui/tabs";

function Annotation() {
  return (
    <Tabs
      defaultValue={AnnotationTab.HIGHLIGHT}
      className="flex h-full flex-col shadow-2xl"
    >
      <AnnotationHeader />
      <TabsContent
        value={AnnotationTab.HIGHLIGHT}
        className="relative min-h-0 w-full flex-1"
      >
        <Highlight />
      </TabsContent>
      <TabsContent
        value={AnnotationTab.HIGHLIGHT_LIST}
        className="relative min-h-0 w-full flex-1"
      >
        <HighlightList />
      </TabsContent>
    </Tabs>
  );
}

export default Annotation;
