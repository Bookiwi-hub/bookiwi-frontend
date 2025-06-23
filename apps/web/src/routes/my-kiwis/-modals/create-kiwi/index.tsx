import { useAtom } from "@bookiwi/jotai";

import { createKiwiModalOpenAtom } from "../atoms";

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
  const [step, setStep] = useAtom(stepAtom);
  const [open, setOpen] = useAtom(createKiwiModalOpenAtom);
  const handleClose = () => {
    setOpen(false);
    setStep(Step.One);
  };

  if (!open) return null;

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
