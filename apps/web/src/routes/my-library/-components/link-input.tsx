import { Link2 } from "lucide-react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

function LinkInput() {
  return (
    <form className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-md border bg-white px-2">
        <Link2 size={16} className="text-muted-foreground" />
        <Input
          type="url"
          placeholder="초대 링크로 참여하기"
          className="w-[240px] border-0 bg-transparent p-2 focus-visible:ring-0 mobile:w-[180px]"
        />
      </div>
      <Button type="submit" variant="default" size="default">
        참여
      </Button>
    </form>
  );
}

export default LinkInput;
