import { memo } from "react";

import { Switch } from "#/components/ui/switch";

interface SinglePageToggleProps {
  isSinglePage: boolean;
  handleCheckedChange: (checked: boolean) => void;
}

function SinglePageToggler({
  isSinglePage,
  handleCheckedChange,
}: SinglePageToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">한 페이지로 보기</span>
      <Switch
        id="theme-switch"
        checked={isSinglePage}
        onCheckedChange={handleCheckedChange}
        onMouseDown={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default memo(SinglePageToggler);
