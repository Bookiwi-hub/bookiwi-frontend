import { MyKiwi } from "@bookiwi/supabase/types";

import { CreateKiwiModal, DetailKiwiModal } from "../-modals";

import KiwiCard from "./kiwi-card";
import KiwiCodeForm from "./kiwi-code-form";
import { CreateKiwiButton, CreateKiwiCardButton } from "./kiwi-create-buttons";
import KiwiSampleCard from "./kiwi-sample-card";

interface KiwisProps {
  kiwis: MyKiwi[];
}

function Kiwis({ kiwis }: KiwisProps) {
  return (
    <>
      <div className="w-full">
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between mobile:flex-col mobile:items-start mobile:gap-4">
            <h2 className="text-2xl font-bold">내 키위</h2>
            <div className="flex items-center gap-2 mobile:w-full mobile:flex-col mobile:items-start">
              <KiwiCodeForm />
              <CreateKiwiButton />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4 px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <KiwiCardGrid kiwis={kiwis} />
        </div>
      </div>
      <DetailKiwiModal />
      <CreateKiwiModal />
    </>
  );
}

function KiwiCardGrid({ kiwis }: KiwisProps) {
  if (kiwis.length === 0) {
    return (
      <>
        <CreateKiwiCardButton />
        <KiwiSampleCard />
      </>
    );
  }

  if (kiwis.length === 1) {
    return (
      <>
        <CreateKiwiCardButton />
        {kiwis.map((kiwi) => (
          <KiwiCard key={kiwi.id} kiwi={kiwi} />
        ))}
      </>
    );
  }

  return kiwis.map((kiwi) => <KiwiCard key={kiwi.id} kiwi={kiwi} />);
}

export default Kiwis;
