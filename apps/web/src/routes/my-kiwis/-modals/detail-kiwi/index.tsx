import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import KebabMenu from "../../-components/kebab-menu";
import {
  closeKiwiDetailModalAtom,
  ModalState,
  modalStateAtom,
  selectedKiwiAtom,
} from "../atoms";

import ActivitiesTab from "./activities-tab";
import InformationTab from "./information-tab";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "#/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";

function DetailKiwiModal() {
  const kiwi = useAtomValue(selectedKiwiAtom);
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.DetailKiwi;
  const closeKiwiDetailModal = useSetAtom(closeKiwiDetailModalAtom);

  const handleClose = () => {
    closeKiwiDetailModal();
  };

  if (!kiwi || !isOpen) return null;

  const { id, name, description, password } = kiwi;

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-[800px] -translate-x-2/4 -translate-y-2/4 gap-0 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl">{name}</DialogTitle>
              <Badge variant="outline" className="text-xs font-normal">
                {password && "비공개 키위"}
              </Badge>
            </div>
            <KebabMenu kiwi={kiwi} />
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="info"
          className="flex h-[calc(85vh-180px)] flex-col pt-4"
        >
          <TabsList className="mb-4 flex w-full gap-2">
            <TabsTrigger
              className="w-1/2"
              value="info"
              onFocus={(e) => e.target.blur()}
            >
              기본 정보
            </TabsTrigger>
            <TabsTrigger
              className="w-1/2"
              value="activities"
              onFocus={(e) => e.target.blur()}
            >
              활동 내역
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* 기본 정보 탭 */}
            <TabsContent
              value="info"
              className="data-[state=inactive]:hidden"
              onFocus={(e) => e.target.blur()}
            >
              <InformationTab kiwi={kiwi} />
            </TabsContent>

            {/* 활동 내역 탭 */}
            <TabsContent
              value="activities"
              className="data-[state=inactive]:hidden"
            >
              <ActivitiesTab kiwi={kiwi} />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            autoFocus={false}
            onFocus={(e) => e.target.blur()}
          >
            닫기
          </Button>
          <Link to="/kiwi/$id" params={{ id }} className="w-full sm:w-auto">
            <Button className="w-full">
              입장하기
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DetailKiwiModal;
