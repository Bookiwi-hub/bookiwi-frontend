import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { closeDeleteKiwiModalAtom, ModalState, modalStateAtom } from "../atoms";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  if (!isOpen) return null;
  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>키위 삭제</DialogTitle>
          <DialogDescription>키위를 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteKiwiModal;
