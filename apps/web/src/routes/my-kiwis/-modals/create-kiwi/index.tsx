import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { closeCreateKiwiModalAtom, ModalState, modalStateAtom } from "../atoms";

import { stepAtom } from "./atoms";
import { Descriptions, Titles } from "./constants";
import Steps from "./steps";
import { Step } from "./types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";

function CreateKiwiModal() {
  const step = useAtomValue(stepAtom);
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.CreateKiwi;
  const closeCreateKiwiModal = useSetAtom(closeCreateKiwiModalAtom);

  const handleOpenChange = (newOpen: boolean) => {
    // Step 3일 때는 모달이 닫히는 것을 방지
    if (!newOpen && step === Step.Three) {
      return;
    }
    closeCreateKiwiModal();
  };

  if (!isOpen) return null;
  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>{Titles[step]}</DialogTitle>
          <DialogDescription>{Descriptions[step]}</DialogDescription>
        </DialogHeader>
        <Steps />
      </DialogContent>
    </Dialog>
  );
}

export default CreateKiwiModal;
