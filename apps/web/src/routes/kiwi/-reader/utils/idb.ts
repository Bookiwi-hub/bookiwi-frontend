import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { AnnotationIDBData, ParticipantIDBData } from "#/types/idb";

export const updateIDBParticipant = async (participant: ParticipantIDBData) => {
  await idb.put(IDBStore.ParticipantStore, participant);
};

export const addIDBAnnotation = async (annotation: AnnotationIDBData) => {
  await idb.add(IDBStore.AnnotationStore, annotation);
};
