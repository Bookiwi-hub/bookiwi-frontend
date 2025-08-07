import { memo } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";
import { Highlight, KiwiHighlight } from "@bookiwi/supabase/types";

import { useTruncatedText } from "#/hooks";
import {
  bookAtom,
  navAtom,
  selectedHighlightAtom,
} from "#/routes/kiwi/-reader/atoms";
import { truncate } from "#/utils";
import { formatDate } from "#/utils/format-date";

interface Props {
  kiwiHighlight: KiwiHighlight;
  kiwiId: string;
}

function HighlightItem({ kiwiHighlight, kiwiId }: Props) {
  const navItems = useAtomValue(navAtom);
  const book = useAtomValue(bookAtom);
  const { text, color, name, sectionHref, createdAt, commentCount } =
    kiwiHighlight;
  const sectionLabel = navItems?.find(
    (item) => item.href === sectionHref,
  )?.label;

  const { displayText, isTruncated, isExpanded, toggleExpanded } =
    useTruncatedText({
      text,
      maxLength: 100,
    });

  const setSelectedHighlight = useSetAtom(selectedHighlightAtom);

  const handleClick = () => {
    const highlight: Highlight = {
      id: kiwiHighlight.id,
      kiwiId,
      participantId: kiwiHighlight.participantId,
      cfi: kiwiHighlight.cfi,
      text: kiwiHighlight.text,
      color: kiwiHighlight.color,
      sectionHref: kiwiHighlight.sectionHref,
      createdAt: kiwiHighlight.createdAt,
      updatedAt: kiwiHighlight.updatedAt,
    };
    setSelectedHighlight(highlight);
    book?.rendition.display(kiwiHighlight.cfi);
  };

  return (
    <div
      className="mb-6 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium" style={{ color }}>
          {name}
        </div>
        <div className="text-xs text-gray-500">{formatDate(createdAt)}</div>
      </div>
      <div className="mb-3 text-sm text-gray-700">
        {displayText}
        {isTruncated && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
            className="ml-1 text-xs text-gray-700 hover:underline"
          >
            {isExpanded ? "접기" : "더 보기"}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>{sectionLabel && truncate(sectionLabel, 20)}</div>
        <div>{`댓글 ${commentCount}개`}</div>
      </div>
    </div>
  );
}

export default memo(HighlightItem);
