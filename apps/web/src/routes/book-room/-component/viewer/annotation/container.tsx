import { ReactNode } from "react";

interface SplitViewProps {
  children?: ReactNode;
}

function AnnotationContainer({ children }: SplitViewProps) {
  return <div className="flex size-full flex-col">{children}</div>;
}

export default AnnotationContainer;
