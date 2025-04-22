import usePageInfo from "./hooks/use-page-info";

import { Slider } from "#/components/ui/slider";

function ReaderPageProgress() {
  const { page, total } = usePageInfo();

  return (
    <div className="w-full space-y-2 px-3">
      <div className="size-full text-center text-black">
        {page && total ? `${page}/${total}` : "페이지를 계산할 수 없습니다"}
      </div>
      {page && total && <Slider className="w-full" />}
    </div>
  );
}

export { ReaderPageProgress };
