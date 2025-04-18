import { User } from "lucide-react";

import ParticipantsDrawer from "./drawer/participants";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "#/components/ui/drawer";

interface ProfileButtonProps {
  profileImage?: string;
  color: string;
}

function Profiles({ profileImage, color }: ProfileButtonProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="flex h-full w-1/5 flex-col items-center justify-center"
        >
          <div className="relative">
            <Avatar className="size-9">
              <AvatarImage src={profileImage} />
              <AvatarFallback>
                <User className="size-6" />
              </AvatarFallback>
            </Avatar>
            <span
              className="absolute left-[25px] top-6 size-3 rounded-full ring-2 ring-white"
              style={{ backgroundColor: color }}
            />
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <ParticipantsDrawer />
      </DrawerContent>
    </Drawer>
  );
}

export default Profiles;
