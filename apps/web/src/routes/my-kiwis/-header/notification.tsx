import { Bell } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";

function Notification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="rounded-full p-2 hover:bg-gray-100 mobile:flex mobile:size-10 mobile:items-center mobile:justify-center"
          aria-label="Notifications"
        >
          <Bell className="size-6 mobile:size-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mobile:w-[90vw] mobile:max-w-[300px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none mobile:text-base">알림</h4>
            <p className="text-sm text-muted-foreground mobile:py-2">
              최근 알림이 없습니다.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
