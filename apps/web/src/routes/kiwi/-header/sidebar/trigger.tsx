import { Menu } from "lucide-react";

import { SheetTrigger } from "#/components/ui/sheet";

function SidebarTrigger() {
  return (
    <SheetTrigger asChild>
      <button
        type="button"
        className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>
    </SheetTrigger>
  );
}

export default SidebarTrigger;
