import { useAtom } from "@bookiwi/jotai";

import { stepAtom } from "./atom";
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

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateKiwiModal({ open, setOpen }: ModalProps) {
  const [step, setStep] = useAtom(stepAtom);
  const handleClose = () => {
    setOpen(false);
    setStep(Step.One);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
