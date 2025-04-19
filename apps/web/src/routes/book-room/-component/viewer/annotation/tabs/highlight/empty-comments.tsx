import { MessageSquare } from "lucide-react";

function EmptyComments() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <MessageSquare className="mb-2 size-8 text-gray-400" />
      <p className="text-sm text-gray-600">코멘트가 없습니다.</p>
      <p className="text-xs text-gray-500">
        하이라이트에 대한 생각이나 느낌을 코멘트로 남겨보세요.
      </p>
    </div>
  );
}

export default EmptyComments;
