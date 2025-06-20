import { memo } from "react";
import { toast } from "sonner";

import { Switch } from "#/components/ui/switch";

interface SinglePageToggleProps {
  isSinglePage: boolean;
  handleCheckedChange: (checked: boolean) => Promise<void>;
}

function SinglePageToggler({
  isSinglePage,
  handleCheckedChange,
}: SinglePageToggleProps) {
  const handleChecked = async (checked: boolean) => {
    try {
      await handleCheckedChange(checked);
    } catch (error) {
      toast.error("설정 정보가 저장되지 않았습니다.");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">한 페이지로 보기</span>
      <Switch
        id="theme-switch"
        checked={isSinglePage}
        onCheckedChange={handleChecked}
        onMouseDown={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default memo(SinglePageToggler);
