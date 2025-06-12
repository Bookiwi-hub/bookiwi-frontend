import { ComponentProps } from "react";

import { cn } from "#/lib/utils";

interface DotProps extends ComponentProps<"div"> {
  color: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

export default function Dot({ color, size = "sm", ...props }: DotProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn("rounded-full", sizeMap[size], className)}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
}
