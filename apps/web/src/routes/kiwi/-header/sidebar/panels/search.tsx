import { Search } from "lucide-react";

import { Input } from "#/components/ui/input";

function SearchPanel() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">검색</h3>
      <div className="relative">
        <Search
          size={18}
          className="absolute left-2 top-2.5 text-muted-foreground"
        />
        <Input type="text" placeholder="책 내용 검색..." className="pl-8" />
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        검색 결과가 여기에 표시됩니다.
      </div>
    </div>
  );
}

export default SearchPanel;
