import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";

function ParticipantsDrawer() {
  const participants = [
    {
      id: 1,
      name: "홍길동",
      profileImage: "https://github.com/shadcn.png",
      color: "#4CAF50", // green
    },
    {
      id: 2,
      name: "김철수",
      profileImage: "https://avatars.githubusercontent.com/u/124599?v=4",
      color: "#2196F3", // blue
    },
    {
      id: 3,
      name: "이영희",
      profileImage: "https://avatars.githubusercontent.com/u/6125?v=4",
      color: "#F44336", // red
    },
    {
      id: 4,
      name: "박지민",
      profileImage: "https://avatars.githubusercontent.com/u/810438?v=4",
      color: "#FFC107", // yellow
    },
    {
      id: 5,
      name: "최수진",
      profileImage: "https://avatars.githubusercontent.com/u/1500684?v=4",
      color: "#9C27B0", // purple
    },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">함께 읽는 사람들</h2>
      <div className="space-y-1">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
          >
            <div className="relative">
              <Avatar className="size-10">
                <AvatarImage src={participant.profileImage} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
              <span
                className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white"
                style={{ backgroundColor: participant.color }}
              />
            </div>
            <div>
              <p className="font-medium">{participant.name}</p>
              <p className="text-sm text-gray-500">페이지 78</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantsDrawer;
