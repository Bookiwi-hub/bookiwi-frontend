import { useEffect, useState } from "react";

import addSampleKiwi from "../-apis/add-sample";
import getSampleKiwi from "../-apis/get-sample";

import KiwiCard from "./kiwi-card";
import KiwiDetailModal from "./kiwi-detail-modal";

import { Card } from "#/components/ui/card";
import Spinner from "#/components/ui/spinner";
import { Kiwi } from "#/types/kiwi";
import { formatDate } from "#/utils/format-date";

function KiwiSampleCardLoading() {
  return (
    <Card className="flex h-[420px] w-full max-w-[280px] flex-col items-center justify-center rounded-2xl border border-slate-200/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-8 text-primary" />
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            예시 키위 준비 중
          </p>
          <p className="text-xs text-slate-500">잠시만 기다려주세요...</p>
        </div>
      </div>
    </Card>
  );
}

function KiwiSampleCard() {
  const [kiwi, setKiwi] = useState<Kiwi | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  useEffect(() => {
    const fetchSampleKiwi = async () => {
      const StoredSampleKiwi = await getSampleKiwi();
      if (!StoredSampleKiwi) {
        const newSampleKiwi = await addSampleKiwi();
        setKiwi(newSampleKiwi);
      } else {
        setKiwi(StoredSampleKiwi);
      }
    };
    fetchSampleKiwi();
  }, []);
  return kiwi ? (
    <>
      <KiwiCard
        id={kiwi.id}
        name={kiwi.name}
        description={kiwi.description}
        coverImage={kiwi.coverImage || ""}
        progress={kiwi.participants[0]?.progress || 0}
        participantsCount={kiwi.participants.length}
        lastActivityAt={
          kiwi.participants[0]?.lastActivityAt
            ? formatDate(kiwi.participants[0].lastActivityAt)
            : ""
        }
        handleSetSelectedKiwi={() => setIsDetailModalOpen(true)}
      />
      {isDetailModalOpen && (
        <KiwiDetailModal
          kiwi={kiwi}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </>
  ) : (
    <KiwiSampleCardLoading />
  );
}

export default KiwiSampleCard;
