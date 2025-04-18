import { MessageSquare, ChevronRight } from "lucide-react";

export default function AnnotationDrawer() {
  const comments = [
    {
      id: 1,
      text: "이 부분이 책의 핵심 주제를 잘 설명하고 있어요.",
      page: 35,
      date: "2023-06-10",
    },
    {
      id: 2,
      text: "이 개념은 나중에 다시 참고할 필요가 있을 것 같아요.",
      page: 64,
      date: "2023-06-15",
    },
    {
      id: 3,
      text: "작가의 관점이 흥미로워요. 이전 챕터의 내용과 비교해볼 필요가 있습니다.",
      page: 98,
      date: "2023-06-18",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">코멘트</h2>
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <MessageSquare className="mb-2 size-10 text-gray-400" />
          <p className="text-gray-500">코멘트가 없습니다.</p>
          <p className="text-sm text-gray-400">
            책을 읽으면서 생각이나 느낌을 코멘트로 남겨보세요.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <button
              key={comment.id}
              type="button"
              className="flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left hover:bg-gray-50"
            >
              <p className="line-clamp-2 text-sm">{comment.text}</p>
              <div className="flex w-full items-center justify-between">
                <p className="text-xs text-gray-500">
                  Page {comment.page} · {comment.date}
                </p>
                <ChevronRight className="size-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
