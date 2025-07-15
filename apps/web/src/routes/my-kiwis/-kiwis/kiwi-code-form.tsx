import { BookDown } from "lucide-react";
import { FormEvent, memo } from "react";
import { toast } from "sonner";

import { getKiwiByShareCode } from "../-apis";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { useLoading } from "#/hooks";
import userManager from "#/managers/user";

function KiwiCodeForm() {
  const [isLoading, getKiwi] = useLoading(getKiwiByShareCode);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userManager.isGuest) {
      toast.error("게스트는 사용할 수 없습니다.");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const shareCode = formData.get("shareCode") as string;

    if (!shareCode?.trim()) {
      // TODO: 공유 코드 입력 필수 알림
      return;
    }

    try {
      const result = await getKiwi(shareCode);
      // TODO: 성공 시 키위 목록 업데이트 또는 해당 키위로 이동
      console.log("키위 가져오기 성공:", result);
    } catch (error) {
      // TODO: 에러 토스트 메시지 표시
      console.error("키위 가져오기 실패:", error);
    }
  };

  return (
    <form
      className="flex items-center gap-2 mobile:w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2 rounded-md border bg-white px-2 mobile:w-full">
        <BookDown size={16} className="text-muted-foreground" />
        <Input
          type="text"
          name="shareCode"
          placeholder="공유 코드를 입력하세요"
          className="w-[240px] border-0 bg-transparent p-2 focus-visible:ring-0 mobile:w-full"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="default"
        disabled={isLoading}
      >
        키위 가져오기
      </Button>
    </form>
  );
}

export default memo(KiwiCodeForm);
