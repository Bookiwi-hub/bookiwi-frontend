import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { useSetAtom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

import { deleteParticipant } from "../../-apis";
import { closeDeleteKiwiModalAtom } from "../atoms";

// import InfoCard from "./info-card";
// import Message from "./message";

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
import userManager from "#/managers/user";

function LeaveKiwi({ kiwi }: { kiwi: MyKiwi }) {
  const closeDeleteKiwiModal = useSetAtom(closeDeleteKiwiModalAtom);
  const [isLeaving, executeLeave] = useLoading(deleteParticipant);
  const router = useRouter();

  const participantId = kiwi.participants.find(
    (participant) => participant.userId === userManager.userId,
  )?.id;

  const handleOpenChange = (newOpen: boolean) => {
    // 나가는 중일 때는 모달을 닫지 못하도록 처리
    if (!newOpen && !isLeaving) {
      closeDeleteKiwiModal();
    }
  };

  const handleLeaveKiwi = async () => {
    if (isLeaving) return; // 중복 클릭 방지

    try {
      if (!participantId) {
        throw new Error("참가자 ID를 찾을 수 없습니다.");
      }

      await executeLeave(participantId);
      toast.success("키위에서 나갔습니다.");
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
            키위 나가기
          </DialogTitle>
          <DialogDescription>키위를 나가시겠습니까?</DialogDescription>
        </DialogHeader>

        {/* 키위 정보 카드 */}
        {/* <InfoCard kiwi={kiwi} /> */}

        {/* 경고 메시지 */}
        {/* <Message isAdmin={false} /> */}

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={closeDeleteKiwiModal}
            onFocus={(e) => e.target.blur()}
            disabled={isLeaving}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleLeaveKiwi}
            disabled={isLeaving}
          >
            {isLeaving ? "나가는 중" : "나가기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LeaveKiwi;
