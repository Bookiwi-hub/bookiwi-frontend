import { Plus, Link2 } from "lucide-react";
import { memo } from "react";

import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Input } from "#/components/ui/input";

interface SetIsModalOpenProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
}

function CreateKiwiCard({ setIsModalOpen }: SetIsModalOpenProps) {
  return (
    <Card
      className="group min-h-[300px] w-full cursor-pointer border border-dashed bg-card/50 transition-all duration-300 hover:border-primary/70 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/20"
      onClick={() => setIsModalOpen(true)}
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

function CreateKiwiButton({ setIsModalOpen }: SetIsModalOpenProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 mobile:hidden"
      onClick={() => setIsModalOpen(true)}
    >
      <Plus size={16} />새 키위 만들기
    </Button>
  );
}

function KiwiLinkForm() {
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

const KiwiLinkFormMemo = memo(KiwiLinkForm);
const CreateKiwiCardMemo = memo(CreateKiwiCard);
const CreateKiwiButtonMemo = memo(CreateKiwiButton);

export {
  KiwiLinkFormMemo as KiwiLinkForm,
  CreateKiwiCardMemo as CreateKiwiCard,
  CreateKiwiButtonMemo as CreateKiwiButton,
};
