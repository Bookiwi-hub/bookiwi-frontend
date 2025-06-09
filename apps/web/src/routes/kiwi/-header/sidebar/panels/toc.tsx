import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { useState, memo } from "react";

import { NavItem } from "@bookiwi/epubjs";
import { useAtomValue } from "@bookiwi/jotai";

import { cn } from "#/lib/utils";
import {
  bookAtom,
  currentSectionAtom,
  navAtom,
} from "#/routes/kiwi/-reader/atoms";

interface TocItemComponentProps {
  item: NavItem;
  level?: number;
  currentHref?: string;
}
function TocItemComponent({
  item,
  level = 0,
  currentHref,
}: TocItemComponentProps) {
  const book = useAtomValue(bookAtom);
  const [isOpen, setIsOpen] = useState(level === 0);

  // 서브목차 존재 여부 확인
  const hasSubitems = item.subitems && item.subitems.length > 0;

  const isActive = currentHref === item.href;

  // 목차 항목 클릭 시 해당 페이지로 이동
  const handleNavClick = () => {
    if (book && book.rendition) {
      book.rendition.display(item.href);
    }
  };

  return (
    <li>
      <div
        className={cn(
          "group flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100",
          isActive && "bg-gray-100",
        )}
        onClick={handleNavClick}
        role="button"
        tabIndex={-1}
        onMouseDown={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}
      >
        <BookOpen size={16} className="mr-1 text-gray-500" />

        <span
          className="flex-1 truncate text-sm transition-colors group-hover:text-primary"
          style={{ paddingLeft: level > 0 ? `${level * 12}px` : "0" }}
        >
          {item.label}
        </span>
        {hasSubitems && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            className="mr-1 rounded-full p-1 hover:bg-gray-200 focus:outline-none"
          >
            {isOpen ? (
              <ChevronDown size={16} className="text-gray-500" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
      {hasSubitems && isOpen && (
        <ul className="ml-2 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
          {item.subitems!.map((subitem, i) => (
            <TocItemComponent
              key={`${subitem.id || i}`}
              item={subitem}
              level={level + 1}
              currentHref={currentHref}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const MemoizedTocItemComponent = memo(TocItemComponent);

function TocPanel() {
  const navItems = useAtomValue(navAtom);
  const currentSection = useAtomValue(currentSectionAtom);

  if (!navItems || !navItems.length)
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <BookOpen className="mb-2 size-8 text-gray-400" />
        <p className="text-xs text-gray-500">목차가 없습니다.</p>
      </div>
    );

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">목차</h3>
      <ul className="space-y-2">
        {navItems.map((item, index) => (
          <MemoizedTocItemComponent
            key={item.id || index}
            item={item}
            currentHref={currentSection?.href}
          />
        ))}
      </ul>
    </div>
  );
}

export default TocPanel;
