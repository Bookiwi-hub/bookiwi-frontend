import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";

function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <Avatar className="mb-3 size-12">
        <AvatarImage
          src="/images/icon.webp"
          alt="키위 AI"
          className="object-contain p-1"
        />
        <AvatarFallback className="bg-blue-100 text-blue-600">
          🥝
        </AvatarFallback>
      </Avatar>
      <p className="text-sm text-gray-600">키위새 AI와 대화를 시작해보세요.</p>
      <p className="text-xs text-gray-500">
        선택한 하이라이트에 대해 AI에게 질문할 수 있습니다.
      </p>
    </div>
  );
}

export default EmptyChat;
