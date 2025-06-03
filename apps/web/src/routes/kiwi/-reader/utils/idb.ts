import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { Settings } from "#/types/kiwi";

export const updateIDBSettings = async (
  settings: Settings,
  participantId: string,
) => {
  await idb.update(IDBStore.ParticipantStore, participantId, {
    settings,
    lastActivityAt: new Date().toISOString(),
  });
};
