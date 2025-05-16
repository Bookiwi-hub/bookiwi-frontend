import { ReactNode } from "react";

import { AnnotationPaneProvider } from "./annotation/context";
import { SplitViewProvider } from "./split-view";

function ViewerProvider({ children }: { children: ReactNode }) {
  return (
    <SplitViewProvider>
      <AnnotationPaneProvider>{children}</AnnotationPaneProvider>
    </SplitViewProvider>
  );
}

export default ViewerProvider;
