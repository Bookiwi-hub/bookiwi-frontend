import { useCallback, useState } from "react";

import { useSetAtom } from "@bookiwi/jotai";

import { useKiwis } from "../-context";
import { createKiwiModalOpenAtom } from "../-modals/atoms";
import CreateKiwiModal from "../-modals/create-kiwi";

import KiwiCard from "./kiwi-card";
import KiwiCodeForm from "./kiwi-code-form";
import { CreateKiwiButton, CreateKiwiCardButton } from "./kiwi-create-buttons";
import KiwiDetailModal from "./kiwi-detail-modal";
import KiwiSampleCard from "./kiwi-sample-card";

import tempUser from "#/DB/users";
import { Kiwi } from "#/types/kiwi";
import { formatDate } from "#/utils/format-date";

function Kiwis() {
  const { kiwis } = useKiwis();
  const setIsCreateKiwiModalOpen = useSetAtom(createKiwiModalOpenAtom);
  const [isKiwiDetailModalOpen, setIsKiwiDetailModalOpen] = useState(false);
  const [selectedKiwi, setSelectedKiwi] = useState<Kiwi | null>(null);
  const handleSetSelectedKiwi = useCallback(
    (id: string) => {
      const selectedKiwiData = kiwis.find((kiwi) => kiwi.id === id);
      setSelectedKiwi(selectedKiwiData || null);
      setIsKiwiDetailModalOpen(true);
    },
    [kiwis],
  );

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
          {kiwis.length === 0 || kiwis.length === 1 ? (
            <>
              <CreateKiwiCardButton setIsModalOpen={setIsCreateKiwiModalOpen} />
              <KiwiSampleCard />
            </>
          ) : (
            kiwis.map((kiwi) => {
              const { name, description, coverImage, participants, id } = kiwi;
              const participantsCount = participants.length;
              const currentParticipant = participants.find(
                (participant) => participant.userId === tempUser.id,
              );
              const progress = currentParticipant?.progress || 0;
              const lastActivityAt = currentParticipant?.lastActivityAt
                ? formatDate(currentParticipant.lastActivityAt)
                : "";
              return (
                <KiwiCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  coverImage={coverImage || ""}
                  progress={progress}
                  participantsCount={participantsCount}
                  lastActivityAt={lastActivityAt}
                  handleSetSelectedKiwi={handleSetSelectedKiwi}
                />
              );
            })
          )}
        </div>
      </div>
      <CreateKiwiModal />
      {isKiwiDetailModalOpen && selectedKiwi && (
        <KiwiDetailModal
          kiwi={selectedKiwi}
          isOpen={isKiwiDetailModalOpen}
          onClose={() => setIsKiwiDetailModalOpen(false)}
        />
      )}
    </>
  );
}

export default Kiwis;
