import { Children, ComponentProps, isValidElement, ReactElement } from "react";

import { useSplitViewContext } from "./context";
import SplitViewHandler from "./handler";

import { cn } from "#/lib/utils";

interface SplitViewGroupProps extends ComponentProps<"div"> {}

function SplitViewGroup({ children, className }: SplitViewGroupProps) {
  const { vertical } = useSplitViewContext();

  // 자식 컴포넌트 배열로 변환
  const childList = Children.toArray(children);

  if (!childList.length) return null;

  const viewKeys = childList
    .filter(
      (c): c is ReactElement<{ id: string }> =>
        isValidElement(c) &&
        c.props !== null &&
        typeof c.props === "object" &&
        "id" in c.props &&
        typeof c.props.id === "string",
    )
    .map((c) => c.props.id);

  return (
    <div className={cn("flex h-full", vertical && "flex-col", className)}>
      {childList.reduce((a, c, i) => (
        <>
          {a}
          <SplitViewHandler
            viewKeys={[viewKeys[i - 1], viewKeys[i]] as [string, string]}
          />
          {c}
        </>
      ))}
    </div>
  );
}

export default SplitViewGroup;
