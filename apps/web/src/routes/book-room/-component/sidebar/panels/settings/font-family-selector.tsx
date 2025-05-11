import { memo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

function FontFamilySelect() {
  const [value, setValue] = useState("original");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">글꼴</span>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="원본" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pretandard">pretandard</SelectItem>
          <SelectItem value="original">원본</SelectItem>
          <SelectItem value="human">휴먼명조</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default memo(FontFamilySelect);
