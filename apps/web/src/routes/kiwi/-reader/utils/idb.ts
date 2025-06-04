import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { ReadingRecord, Settings } from "#/types/kiwi";

export const updateIDBSettings = async (
  settings: Settings,
  participantId: string,
) => {
  await idb.update(IDBStore.ParticipantStore, participantId, {
    settings,
    lastActivityAt: new Date().toISOString(),
  });
};

export const updateIDBRecord = async (
  record: ReadingRecord,
  participantId: string,
) => {
  await idb.update(IDBStore.ParticipantStore, participantId, {
    record,
    lastActivityAt: new Date().toISOString(),
  });
};
