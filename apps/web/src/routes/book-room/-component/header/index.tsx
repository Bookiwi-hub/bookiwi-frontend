import { Link } from "@tanstack/react-router";

import Sidebar from "../sidebar";

import AnnotationButton from "./annotation-button";
import BookmarkButton from "./bookmark-button";
import Profiles from "./profiles";

import { Separator } from "#/components/ui/separator";

interface HeaderProps {
  title: string;
  profileImage?: string;
  color: string;
}

function Header({ title, profileImage, color }: HeaderProps) {
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
          {title}
        </h1>
        <div className="flex items-center gap-4 pr-3">
          <BookmarkButton />
          <AnnotationButton />
          <Profiles profileImage={profileImage} color={color} />
        </div>
      </div>
      <Separator />
    </header>
  );
}

export default Header;
