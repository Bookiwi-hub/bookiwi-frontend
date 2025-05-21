import { Plus, Link2 } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";

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

export function CreateKiwiCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        className="group min-h-[300px] w-full cursor-pointer border border-dashed bg-card/50 transition-all duration-300 hover:border-primary/70 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/20"
        onClick={() => setOpen(true)}
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
      <CreateKiwiModal open={open} setOpen={setOpen} />
    </>
  );
}

export function CreateKiwiButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 mobile:hidden"
        onClick={() => setOpen(true)}
      >
        <Plus size={16} />새 키위 만들기
      </Button>
      <CreateKiwiModal open={open} setOpen={setOpen} />
    </>
  );
}

export function KiwiLinkForm() {
  return (
    <form
      className="flex items-center gap-2 mobile:w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-2 rounded-md border bg-white px-2 mobile:w-full">
        <Link2 size={16} className="text-muted-foreground" />
        <Input
          type="url"
          placeholder="링크로 키위 참여하기"
          className="w-[240px] border-0 bg-transparent p-2 focus-visible:ring-0 mobile:w-full"
        />
      </div>
      <Button type="submit" variant="default" size="default">
        참여
      </Button>
    </form>
  );
}
