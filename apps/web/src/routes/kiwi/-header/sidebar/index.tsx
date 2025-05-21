import { useState } from "react";

import SidebarNav, { NavType } from "./nav";
import SidebarPanels from "./panels";
import SidebarTrigger from "./trigger";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
} from "#/components/ui/sheet";

function Sidebar() {
  const [activeTab, setActiveTab] = useState<NavType>("toc");

  return (
    <Sheet>
      <SidebarTrigger />
      <SheetPortal>
        <SheetOverlay className="bg-transparent" />
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />
        <SheetContent
          side="left"
          className="flex flex-row gap-1 p-0 sm:max-w-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarPanels activeTab={activeTab} />
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}

export default Sidebar;
