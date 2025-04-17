import { Children, ComponentProps, isValidElement, ReactElement } from "react";

import { useSplitViewContext } from "./context";
import SplitViewSeparator from "./separator";

import { cn } from "#/lib/utils";

interface SplitViewGroupProps extends ComponentProps<"div"> {}

function SplitViewPaneGroup({ children, className }: SplitViewGroupProps) {
  const { vertical } = useSplitViewContext();

  // 자식 컴포넌트 배열로 변환
  const childList = Children.toArray(children);

  if (!childList.length) return null;

  const paneIds = childList
    .filter(
      (c): c is ReactElement<{ paneId: string }> =>
        isValidElement(c) &&
        c.props !== null &&
        typeof c.props === "object" &&
        "paneId" in c.props &&
        typeof c.props.paneId === "string",
    )
    .map((c) => c.props.paneId);

  return (
    <div className={cn("flex size-full", vertical && "flex-col", className)}>
      {childList.reduce((prevViews, CurrentView, i) => (
        <>
          {prevViews}
          <SplitViewSeparator
            prevPaneId={paneIds[i - 1] ?? ""}
            currentPaneId={paneIds[i] ?? ""}
          />
          {CurrentView}
        </>
      ))}
    </div>
  );
}

export default SplitViewPaneGroup;
