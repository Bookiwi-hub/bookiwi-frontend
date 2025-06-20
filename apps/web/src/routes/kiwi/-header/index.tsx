import { Link } from "@tanstack/react-router";

import { useAtomValue } from "@bookiwi/jotai";

import { kiwiAtom } from "../-reader/atoms";
import AnnotationPaneTrigger from "../-split-view/annotation/trigger";

import BookmarkButton from "./bookmark-button";
import Profiles from "./profiles";
import Sidebar from "./sidebar";

import { Separator } from "#/components/ui/separator";

function Header() {
  const kiwi = useAtomValue(kiwiAtom);
  return (
    <header className="relative">
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Bookiwi logo"
              className="size-9 mobile:size-8"
            />
          </Link>
          <Sidebar />
        </div>
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
          {kiwi?.name}
        </h1>
        <div className="flex items-center gap-4 pr-3">
          <BookmarkButton />
          <AnnotationPaneTrigger />
          <Profiles />
        </div>
      </div>
      <Separator />
    </header>
  );
}

export default Header;
