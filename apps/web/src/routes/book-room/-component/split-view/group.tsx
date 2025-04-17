import { Children, ComponentProps, isValidElement, ReactElement } from "react";

import { useSplitViewContext } from "./context";
import SplitViewSeparator from "./separator";

import { cn } from "#/lib/utils";

interface SplitViewGroupProps extends ComponentProps<"div"> {}

function SplitViewGroup({ children, className }: SplitViewGroupProps) {
  const { vertical } = useSplitViewContext();

  // 자식 컴포넌트 배열로 변환
  const childList = Children.toArray(children);

  if (!childList.length) return null;

  const viewIds = childList
    .filter(
      (c): c is ReactElement<{ viewId: string }> =>
        isValidElement(c) &&
        c.props !== null &&
        typeof c.props === "object" &&
        "viewId" in c.props &&
        typeof c.props.viewId === "string",
    )
    .map((c) => c.props.viewId);

  return (
    <div className={cn("flex size-full", vertical && "flex-col", className)}>
      {childList.reduce((prevViews, CurrentView, i) => (
        <>
          {prevViews}
          <SplitViewSeparator
            prevViewId={viewIds[i - 1] ?? ""}
            currentViewId={viewIds[i] ?? ""}
          />
          {CurrentView}
        </>
      ))}
    </div>
  );
}

export default SplitViewGroup;
