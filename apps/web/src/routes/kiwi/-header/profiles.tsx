import { useAtomValue } from "@bookiwi/jotai";

import { participantsAtom } from "../-reader/atoms";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import Dot from "#/components/ui/dot";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";

interface ProfileButtonProps {
  profileImage?: string;
  color: string;
}

function ProfileButton({ profileImage, color }: ProfileButtonProps) {
  return (
    <div className="relative m-2 cursor-pointer hover:bg-gray-100">
      <Avatar className="size-8">
        <AvatarImage src={profileImage} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Dot
        color={color}
        size="sm"
        className="absolute left-5 top-5  ring-2 ring-white"
      />
    </div>
  );
}

interface ProfilesProps {
  profileImage?: string;
  color: string;
}

function Profiles({ profileImage, color }: ProfilesProps) {
  const participants = useAtomValue(participantsAtom);
  return (
    <Popover>
      <PopoverTrigger tabIndex={-1} onMouseDown={(e) => e.preventDefault()}>
        <ProfileButton profileImage={profileImage} color={color} />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="border-b px-4 py-3">
          <h4 className="font-medium">함께 읽는 사람들</h4>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50"
            >
              <div className="relative">
                <Avatar className="size-8">
                  <AvatarImage src={participant.profileImage} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
                <Dot
                  color={participant.color}
                  size="sm"
                  className="absolute left-5 top-5 ring-2 ring-white"
                />
              </div>
              <span className="text-sm font-medium">{participant.name}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Profiles;
