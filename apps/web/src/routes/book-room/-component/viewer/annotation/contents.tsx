import Highlight from "./tabs/highlight";
import HighlightList from "./tabs/highlight-list";
import { AnnotationTab } from "./tabs/tab";

import { TabsContent } from "#/components/ui/tabs";

function AnnotationContents() {
  return (
    <>
      <TabsContent value={AnnotationTab.HIGHLIGHT}>
        <Highlight />
      </TabsContent>
      <TabsContent value={AnnotationTab.HIGHLIGHT_LIST}>
        <HighlightList />
      </TabsContent>
    </>
  );
}

export default AnnotationContents;
