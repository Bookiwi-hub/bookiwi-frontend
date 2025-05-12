import {
  BookOpen,
  BookMarked,
  MessageSquareQuote,
  Settings,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

import {
  AnnotationDrawer,
  BookmarksDrawer,
  SettingDrawer,
  TOCDrawer,
} from "./drawer";
import Profiles from "./profiles";

import { Drawer, DrawerContent, DrawerTrigger } from "#/components/ui/drawer";

type MenuItemType = {
  icon: LucideIcon;
  label: string;
  drawer: React.ReactNode;
};

function MobileMenu() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const menuItems: MenuItemType[] = [
    {
      icon: BookOpen,
      label: "목차",
      drawer: <TOCDrawer />,
    },
    {
      icon: BookMarked,
      label: "책갈피",
      drawer: <BookmarksDrawer />,
    },
    {
      icon: MessageSquareQuote,
      label: "코멘트",
      drawer: <AnnotationDrawer />,
    },
    {
      icon: Settings,
      label: "설정",
      drawer: <SettingDrawer />,
    },
  ];

  return (
    <menu className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div className="flex h-16 items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openDrawer === item.label;

          return (
            <Drawer
              key={item.label}
              open={isOpen}
              onOpenChange={(open) => {
                setOpenDrawer(open ? item.label : null);
              }}
            >
              <DrawerTrigger asChild>
                <button
                  type="button"
                  className="flex h-full w-1/5 flex-col items-center justify-center"
                >
                  <Icon className="size-6" />
                  <span className="mt-1 text-xs font-medium">{item.label}</span>
                </button>
              </DrawerTrigger>
              <DrawerContent>{item.drawer}</DrawerContent>
            </Drawer>
          );
        })}
        <Profiles profileImage="https://github.com/shadcn.png" color="green" />
      </div>
    </menu>
  );
}

export default MobileMenu;
