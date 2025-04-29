import { Link2, Plus } from "lucide-react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

function LinkInput() {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 mobile:flex-col">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Link2 size={20} className="text-primary" />
        <span className="text-sm font-medium">다른 키위에 참여하기</span>
      </div>
      <form className="flex flex-1 items-center gap-2 mobile:w-full">
        <Input
          type="url"
          placeholder="초대 링크를 붙여넣으세요"
          className="flex-1 bg-white"
        />
        <Button
          type="submit"
          variant="default"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={16} />
          키위 참여하기
        </Button>
      </form>
    </div>
  );
}

export default LinkInput;
