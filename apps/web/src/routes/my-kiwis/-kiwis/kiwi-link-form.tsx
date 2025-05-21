import { Link2 } from "lucide-react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

interface KiwiLinkFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function KiwiLinkForm({ onSubmit }: KiwiLinkFormProps) {
  return (
    <form className="flex items-center gap-2 mobile:w-full" onSubmit={onSubmit}>
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

export default KiwiLinkForm;
