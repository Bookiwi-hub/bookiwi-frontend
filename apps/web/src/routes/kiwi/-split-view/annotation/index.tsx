import { memo } from "react";

import Contents from "./contents";
import AnnotationHeader from "./header";

function Annotation() {
  return (
    <div className="flex h-full flex-col shadow-2xl">
      <AnnotationHeader />
      <Contents />
    </div>
  );
}

export default memo(Annotation);
