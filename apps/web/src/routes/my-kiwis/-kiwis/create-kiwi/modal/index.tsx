import { ComponentType, createElement } from "react";

import { KiwiProvider, useCreateKiwi } from "./context";
import CreatedSuccess from "./created-success";
import EpubUpload from "./epub-upload";
import {
  Step1FooterButton,
  Step2FooterButton,
  Step3FooterButton,
  Step4FooterButton,
} from "./footer-buttons";
import KiwiInfo from "./kiwi-info";
import Loading from "./loading";
import { ActionTypes, Step } from "./reducer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "#/components/ui/dialog";

const Titles: Record<Step, string> = {
  [Step.BasicInfo]: "새로운 키위 만들기",
  [Step.FileUpload]: "새로운 키위 만들기",
  [Step.Processing]: "키위 처리 중",
  [Step.Complete]: "키위 생성 완료",
};

const Descriptions: Record<Step, string> = {
  [Step.BasicInfo]:
    "책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.",
  [Step.FileUpload]: "키위에서 사용할 EPUB 파일을 업로드하세요.",
  [Step.Processing]: "EPUB 파일을 처리하고 키위를 생성하는 중입니다...",
  [Step.Complete]: "아래 공유 코드를 사용해 친구들을 초대하세요.",
};

const Contents: Record<Step, ComponentType> = {
  [Step.BasicInfo]: KiwiInfo,
  [Step.FileUpload]: EpubUpload,
  [Step.Processing]: Loading,
  [Step.Complete]: CreatedSuccess,
};

const FooterButtons: Partial<Record<Step, ComponentType>> = {
  [Step.BasicInfo]: Step1FooterButton,
  [Step.FileUpload]: Step2FooterButton,
  [Step.Processing]: Step3FooterButton,
};

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateKiwiModalDialog({ open, setOpen }: ModalProps) {
  const { state, dispatch } = useCreateKiwi();

  const { step } = state;

  const handleClose = () => {
    dispatch({ type: ActionTypes.RESET });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-[450px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle>{Titles[step]}</DialogTitle>
          <DialogDescription>{Descriptions[step]}</DialogDescription>
        </DialogHeader>

        {createElement(Contents[step])}

        <DialogFooter className="sm:justify-between">
          {step !== Step.Complete &&
            FooterButtons[step] &&
            createElement(FooterButtons[step])}
          {step === Step.Complete && (
            <Step4FooterButton onClick={handleClose} />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateKiwiModal({ open, setOpen }: ModalProps) {
  return (
    <KiwiProvider>
      <CreateKiwiModalDialog open={open} setOpen={setOpen} />
    </KiwiProvider>
  );
}

export default CreateKiwiModal;
