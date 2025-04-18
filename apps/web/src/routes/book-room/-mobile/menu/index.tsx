import {
  BookOpen,
  BookMarked,
  MessageSquareQuote,
  Settings,
  LucideIcon,
} from "lucide-react";

import ProfileButton from "./profile-button";

type MenuItemType = {
  icon: LucideIcon;
  label: string;
};

const menuItems: MenuItemType[] = [
  {
    icon: BookOpen,
    label: "목차",
  },
  {
    icon: BookMarked,
    label: "책갈피",
  },
  {
    icon: MessageSquareQuote,
    label: "코멘트",
  },
  {
    icon: Settings,
    label: "설정",
  },
];

function MobileMenu() {
  return (
    <menu className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div className="flex h-16 items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className="flex h-full w-1/5 flex-col items-center justify-center"
            >
              <Icon className="size-6" />
              <span className="mt-1 text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
        <ProfileButton
          profileImage="https://github.com/shadcn.png"
          color="green"
        />
      </div>
    </menu>
  );
}

export default MobileMenu;
