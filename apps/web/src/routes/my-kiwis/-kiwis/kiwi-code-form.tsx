import { BookDown } from "lucide-react";
import { memo } from "react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

function KiwiCodeForm() {
  return (
    <form
      className="flex items-center gap-2 mobile:w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-2 rounded-md border bg-white px-2 mobile:w-full">
        <BookDown size={16} className="text-muted-foreground" />
        <Input
          type="url"
          placeholder="참여 코드 입력하기"
          className="w-[240px] border-0 bg-transparent p-2 focus-visible:ring-0 mobile:w-full"
        />
      </div>
      <Button type="submit" variant="default" size="default">
        참여
      </Button>
    </form>
  );
}

export default memo(KiwiCodeForm);
