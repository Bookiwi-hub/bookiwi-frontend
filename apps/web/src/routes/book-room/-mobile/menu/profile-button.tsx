import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";

interface ProfileButtonProps {
  profileImage?: string;
  color: string;
}

function ProfileButton({ profileImage, color }: ProfileButtonProps) {
  return (
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
  );
}

export default ProfileButton;
