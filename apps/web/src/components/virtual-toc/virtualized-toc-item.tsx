import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { memo } from "react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";

import { cn } from "#/lib/utils";

interface FlattenedTocItem extends NavItem {
  level: number;
  index: number;
  isExpanded?: boolean;
  hasChildren: boolean;
  parentIndex?: number;
}

interface VirtualizedTocItemProps {
  item: FlattenedTocItem;
  onNavigate: (href: string) => void;
  onToggleExpand: (index: number) => void;
  isActive?: boolean;
  style?: React.CSSProperties;
}

export const VirtualizedTocItem = memo(
  ({
    item,
    onNavigate,
    onToggleExpand,
    isActive = false,
    style,
  }: VirtualizedTocItemProps) => {
    const handleClick = () => {
      onNavigate(item.href);
    };

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleExpand(item.index);
    };

    return (
      <div
        style={style}
        className={cn(
          "group flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100",
          isActive && "bg-gray-100",
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div
          style={{ paddingLeft: `${item.level * 12}px` }}
          className="flex flex-1 items-center"
        >
          <BookOpen size={16} className="mr-2 shrink-0 text-gray-500" />

          <span className="flex-1 truncate text-sm transition-colors group-hover:text-primary">
            {item.label}
          </span>

          {item.hasChildren && (
            <button
              type="button"
              onClick={handleToggle}
              className="ml-2 shrink-0 rounded-full p-1 hover:bg-gray-200 focus:outline-none"
              onMouseDown={(e) => e.preventDefault()}
            >
              {item.isExpanded ? (
                <ChevronDown size={16} className="text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);
