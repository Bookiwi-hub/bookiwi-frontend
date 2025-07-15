import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import InfoCard from "../../-components/info-card";
import {
  closeModalAtom,
  selectedKiwiAtom,
  ModalState,
  modalStateAtom,
} from "../atoms";

import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";

function SharedKiwiModal() {
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.SharedKiwi;
  const kiwi = useAtomValue(selectedKiwiAtom);
  const closeSharedKiwiModal = useSetAtom(closeModalAtom);

  if (!isOpen || !kiwi) return null;

  const handleOpenChange = (newOpen: boolean) => {
    // 나가는 중일 때는 모달을 닫지 못하도록 처리
    if (!newOpen) {
      closeSharedKiwiModal();
    }
  };

  const handleJoinKiwi = async () => {};

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        className="min-w-[500px] mobile:min-w-full"
        onFocus={(e) => e.target.blur()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            키위 가져오기
          </DialogTitle>
          <DialogDescription>키위를 가져오시겠습니까?</DialogDescription>
        </DialogHeader>

        {/* 키위 정보 카드 */}
        <InfoCard kiwi={kiwi} />

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={closeSharedKiwiModal}
            onFocus={(e) => e.target.blur()}
          >
            취소
          </Button>
          <Button variant="destructive" onClick={handleJoinKiwi}>
            가져오기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SharedKiwiModal;
