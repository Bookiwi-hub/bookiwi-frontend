import { ReactNode } from "react";

import { AnnotationTab } from "./tabs/tab";

import { Tabs } from "#/components/ui/tabs";

interface SplitViewProps {
  children?: ReactNode;
}

function AnnotationContainer({ children }: SplitViewProps) {
  return (
    <Tabs defaultValue={AnnotationTab.HIGHLIGHT} className="size-full">
      <div className="flex size-full flex-col bg-white shadow-2xl">
        {children}
      </div>
    </Tabs>
  );
}

export default AnnotationContainer;
