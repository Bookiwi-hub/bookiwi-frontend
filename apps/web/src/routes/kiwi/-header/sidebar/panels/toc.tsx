import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { useState, memo, useCallback } from "react";

import Section from "@bookiwi/epubjs/types/section";

import { cn } from "#/lib/utils";
import { useBook } from "#/routes/kiwi/-reader";

// EPUBJS의 Navigation 항목 타입 정의
interface NavItem {
  href: string;
  id?: string;
  label: string;
  subitems?: NavItem[];
}
interface TocItemComponentProps {
  item: NavItem;
  handleNavClick: (href: string) => void;
  level?: number;
  currentSection?: string;
}
function TocItemComponent({
  item,
  handleNavClick,
  level = 0,
  currentSection,
}: TocItemComponentProps) {
  const [isOpen, setIsOpen] = useState(level === 0);

  // 서브목차 존재 여부 확인
  const hasSubitems = item.subitems && item.subitems.length > 0;

  return (
    <li>
      <div
        className={cn(
          "group flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100",
          currentSection === item.href && "bg-gray-100",
        )}
        onClick={() => handleNavClick(item.href)}
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
              handleNavClick={handleNavClick}
              level={level + 1}
              currentSection={currentSection}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const MemoizedTocItemComponent = memo(TocItemComponent);

function TocPanel() {
  const { book } = useBook();
  const [toc, setToc] = useState<NavItem[]>([]);
  const [currentSection, setCurrentSection] = useState<string>();

  const tocRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return;
      book.loaded.navigation.then((navigation) => {
        setToc(navigation.toc);
      });

      book.rendition.on("rendered", (section: Section) => {
        setCurrentSection(section.href);
      });
    },
    [book],
  );
  // 목차 항목 클릭 시 해당 페이지로 이동
  const handleNavClick = (href: string) => {
    if (book && book.rendition) {
      book.rendition.display(href);
    }
  };

  return (
    <div ref={tocRef}>
      <h3 className="mb-4 text-lg font-medium">목차</h3>
      {toc.length > 0 ? (
        <ul className="space-y-2">
          {toc.map((item, index) => (
            <MemoizedTocItemComponent
              key={item.id || index}
              item={item}
              handleNavClick={handleNavClick}
              currentSection={currentSection}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <BookOpen className="mb-2 size-8 text-gray-400" />
          <p className="text-sm text-gray-600">목차를 불러오는 중입니다</p>
          <p className="text-xs text-gray-500">
            잠시만 기다려주세요. 또는 이 책에 목차가 없을 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}

export default TocPanel;
