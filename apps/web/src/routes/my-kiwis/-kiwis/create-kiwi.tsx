import { Plus } from "lucide-react";

import { Card, CardContent } from "#/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";

interface CreateKiwiModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateKiwiModal({ open, setOpen }: CreateKiwiModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새로운 키위 만들기</DialogTitle>
          <DialogDescription>
            책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.
          </DialogDescription>
        </DialogHeader>
        {/* Add your form or content here */}
        <div className="py-4">
          <p>모달 내용을 여기에 추가하세요.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CreateKiwiCardProps {
  onClick: () => void;
}

export function CreateKiwiCard({ onClick }: CreateKiwiCardProps) {
  return (
    <Card
      className="group min-h-[300px] w-full cursor-pointer border border-dashed bg-card/50 transition-all duration-300 hover:border-primary/70 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/20"
      onClick={onClick}
    >
      <CardContent className="flex h-full flex-col items-center justify-center gap-6 p-8">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <Plus size={30} strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-lg font-medium tracking-tight">
            새로운 키위 만들기
          </h3>
          <p className="max-w-[80%] text-sm text-muted-foreground">
            책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
