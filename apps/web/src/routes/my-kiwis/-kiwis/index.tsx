import { useState } from "react";

import CreateKiwiModal from "./create-kiwi-modal";
import KiwiCard from "./kiwi-card";
import KiwiCodeForm from "./kiwi-code-form";
import { CreateKiwiButton, CreateKiwiCardButton } from "./kiwi-create-buttons";
import KiwiSampleCard from "./kiwi-sample-card";

import { Kiwi } from "#/types/kiwi";

interface KiwisProps {
  kiwis: Kiwi[];
}

function Kiwis({ kiwis }: KiwisProps) {
  const [isCreateKiwiModalOpen, setIsCreateKiwiModalOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between mobile:flex-col mobile:items-start mobile:gap-4">
            <h2 className="text-2xl font-bold">내 키위</h2>
            <div className="flex items-center gap-2 mobile:w-full mobile:flex-col mobile:items-start">
              <KiwiCodeForm />
              <CreateKiwiButton setIsModalOpen={setIsCreateKiwiModalOpen} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4 px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {kiwis.length === 0 ? (
            <>
              <CreateKiwiCardButton setIsModalOpen={setIsCreateKiwiModalOpen} />
              <KiwiSampleCard />
            </>
          ) : (
            kiwis.map((kiwi) => <KiwiCard key={kiwi.id} kiwi={kiwi} />)
          )}
        </div>
      </div>
      {isCreateKiwiModalOpen && (
        <CreateKiwiModal
          open={isCreateKiwiModalOpen}
          setOpen={setIsCreateKiwiModalOpen}
        />
      )}
    </>
  );
}

export default Kiwis;
