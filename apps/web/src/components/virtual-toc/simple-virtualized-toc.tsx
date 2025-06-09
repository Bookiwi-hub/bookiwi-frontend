import { NavItem } from "@bookiwi/epubjs/types/navigation";

import { VirtualizedToc } from "./virtualized-toc";

interface SimpleVirtualizedTocProps {
  toc: NavItem[];
  maxHeight?: number;
  itemHeight?: number;
  onNavigate?: (href: string) => void;
  expandedByDefault?: boolean;
  showNumbering?: boolean;
}

export function SimpleVirtualizedToc(props: SimpleVirtualizedTocProps) {
  return <VirtualizedToc {...props} variant="simple" showTitle={false} />;
}
