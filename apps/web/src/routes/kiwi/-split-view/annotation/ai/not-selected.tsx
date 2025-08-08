import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";

function NotSelected() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <Avatar className="mb-4 size-16">
        <AvatarImage
          src="/images/icon.webp"
          alt="키위 AI"
          className="object-contain p-2"
        />
        <AvatarFallback className="bg-blue-100 text-2xl text-blue-600">
          🥝
        </AvatarFallback>
      </Avatar>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        키위새 AI와 대화하기
      </h3>
      <p className="text-sm text-muted-foreground">
        텍스트를 선택해 키위새 AI에게 질문해보세요.
      </p>
    </div>
  );
}

export default NotSelected;
