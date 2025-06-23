import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { createKiwiModalOpenAtom } from "../atoms";

import { closeCreateKiwiModalAtom, stepAtom } from "./atoms";
import { Descriptions, Titles } from "./constants";
import Steps from "./steps";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";

function CreateKiwiModal() {
  const step = useAtomValue(stepAtom);
  const open = useAtomValue(createKiwiModalOpenAtom);
  const closeCreateKiwiModal = useSetAtom(closeCreateKiwiModalAtom);

  if (!open) return null;
  return (
    <Dialog open onOpenChange={closeCreateKiwiModal}>
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
