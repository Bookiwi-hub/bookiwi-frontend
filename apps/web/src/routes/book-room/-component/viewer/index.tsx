import Annotation from "../annotation";
import { SplitViewGroup, SplitViewItem } from "../split-view";

import Reader from "./reader";

function Viewer() {
  return (
    <SplitViewGroup>
      <SplitViewItem id="reader" preferredSize={1500} minSize={500}>
        <Reader />
      </SplitViewItem>
      <SplitViewItem id="annotation" preferredSize={400} minSize={150}>
        <Annotation />
      </SplitViewItem>
    </SplitViewGroup>
  );
}

export default Viewer;
