import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { ParticipantIDBData } from "#/types/idb";

export const updateIDBParticipant = async (participant: ParticipantIDBData) => {
  await idb.put(IDBStore.ParticipantStore, participant);
};
