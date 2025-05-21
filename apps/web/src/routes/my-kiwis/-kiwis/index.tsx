import { CreateKiwiButton, CreateKiwiCard, KiwiLinkForm } from "./create-kiwi";
import KiwiCard from "./kiwi-card";

import { Kiwi } from "#/types/kiwi";

interface KiwisProps {
  kiwis: Kiwi[];
}

// 샘플 키위 데이터 - 예시 목적으로만 사용
const sampleKiwi: Kiwi = {
  id: "sample-kiwi",
  name: "예시 키위(모비딕)",
  description: "들어와 키위를 체험해보세요!",
  image: "/images/moby-dick-cover.jpg",
  lastActivityAt: "오늘",
  progress: 0,
  memberCount: 3,
  isPrivate: false,
};

export default function Kiwis({ kiwis }: KiwisProps) {
  return (
    <div className="w-full">
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between mobile:flex-col mobile:items-start mobile:gap-4">
          <h2 className="text-2xl font-bold">내 키위</h2>
          <div className="flex items-center gap-2 mobile:w-full mobile:flex-col mobile:items-start">
            <KiwiLinkForm />
            <CreateKiwiButton />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-4 px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {kiwis.length === 0 ? (
          <>
            <CreateKiwiCard />
            <KiwiCard key={sampleKiwi.id} kiwi={sampleKiwi} />
          </>
        ) : (
          kiwis.map((kiwi) => <KiwiCard key={kiwi.id} kiwi={kiwi} />)
        )}
      </div>
    </div>
  );
}
