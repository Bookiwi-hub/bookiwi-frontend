import { BookDown } from "lucide-react";
import { FormEvent, memo } from "react";
import { toast } from "sonner";

import { useSetAtom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

import { getKiwiByShareCode } from "../-apis";
import { openSharedKiwiModalAtom } from "../-modals/atoms";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { useLoading } from "#/hooks";

interface KiwiCodeFormProps {
  myKiwis: MyKiwi[];
}

function KiwiCodeForm({ myKiwis }: KiwiCodeFormProps) {
  const [isLoading, getKiwi] = useLoading(getKiwiByShareCode);
  const openSharedKiwiModal = useSetAtom(openSharedKiwiModalAtom);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const shareCode = formData.get("shareCode") as string;

    if (!shareCode?.trim()) {
      toast.error("공유 코드를 입력해주세요.");
      return;
    }

    const isExist = myKiwis.some((kiwi) => kiwi.shareCode === shareCode);
    if (isExist) {
      toast.error("이미 존재하는 키위입니다.");
      return;
    }

    try {
      const kiwi = await getKiwi(shareCode);
      openSharedKiwiModal(kiwi);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("키위를 가져오지 못했습니다.");
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
