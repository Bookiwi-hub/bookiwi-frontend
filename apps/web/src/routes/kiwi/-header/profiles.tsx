import { participants } from "#/DB/participants";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
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
    <div className="relative cursor-pointer rounded-md p-2 hover:bg-gray-100">
      <Avatar className="size-7">
        <AvatarImage src={profileImage} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span
        className="absolute left-[25px] top-6 size-[10px] rounded-full ring-2 ring-white"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

interface ProfilesProps {
  profileImage?: string;
  color: string;
}

function Profiles({ profileImage, color }: ProfilesProps) {
  return (
    <Popover>
      <PopoverTrigger>
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
                <span
                  className="absolute left-6 top-6 size-2.5 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: participant.color }}
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
