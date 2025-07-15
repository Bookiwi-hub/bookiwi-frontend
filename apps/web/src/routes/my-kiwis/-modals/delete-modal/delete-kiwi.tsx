import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { useSetAtom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

import { deleteKiwi } from "../../-apis";
import { closeDeleteKiwiModalAtom } from "../atoms";

import InfoCard from "./info-card";
import Message from "./message";

import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { useLoading } from "#/hooks";

function DeleteKiwi({ kiwi }: { kiwi: MyKiwi }) {
  const closeDeleteKiwiModal = useSetAtom(closeDeleteKiwiModalAtom);
  const [isDeleting, executeDelete] = useLoading(deleteKiwi);
  const router = useRouter();

  const kiwiId = kiwi.id;

  const handleOpenChange = (newOpen: boolean) => {
    // 삭제 중일 때는 모달을 닫지 못하도록 처리
    if (!newOpen && !isDeleting) {
      closeDeleteKiwiModal();
    }
  };

  const handleDeleteKiwi = async () => {
    if (isDeleting) return; // 중복 클릭 방지

    try {
      await executeDelete(kiwiId);
      toast.success("키위가 삭제되었습니다.");
      await router.invalidate();
      closeDeleteKiwiModal();
    } catch (error) {
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        className="min-w-[500px] mobile:min-w-full"
        onFocus={(e) => e.target.blur()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            키위 삭제
          </DialogTitle>
          <DialogDescription>키위를 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>

        {/* 키위 정보 카드 */}
        <InfoCard kiwi={kiwi} />

        {/* 경고 메시지 */}
        <Message isAdmin />

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={closeDeleteKiwiModal}
            onFocus={(e) => e.target.blur()}
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteKiwi}
            disabled={isDeleting}
          >
            {isDeleting ? "삭제 중" : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteKiwi;
