import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { closeDeleteKiwiModalAtom, ModalState, modalStateAtom } from "../atoms";

import { targetKiwiAtom } from "./atoms";
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

function DeleteKiwiModal() {
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.DeleteKiwi;
  const closeDeleteKiwiModal = useSetAtom(closeDeleteKiwiModalAtom);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      closeDeleteKiwiModal();
    }
  };

  const handleDelete = () => {
    console.log("delete");
    closeDeleteKiwiModal();
  };

  const kiwi = useAtomValue(targetKiwiAtom);

  if (!isOpen || !kiwi) return null;

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-[500px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            키위 삭제
          </DialogTitle>
          <DialogDescription>키위를 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>

        {/* 키위 정보 카드 */}
        <InfoCard kiwi={kiwi} />

        {/* 경고 메시지 */}
        <Message />

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={closeDeleteKiwiModal}
            onFocus={(e) => e.target.blur()}
          >
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteKiwiModal;
