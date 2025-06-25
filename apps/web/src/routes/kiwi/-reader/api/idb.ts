import idb, { IDBStore } from "#/managers/idb";
import { AnnotationIDBData, ParticipantIDBData } from "#/types/idb";

export const updateIDBParticipant = async (participant: ParticipantIDBData) => {
  try {
    await idb.put(IDBStore.ParticipantStore, participant);
  } catch (error) {
    throw new Error(
      `Failed to update participant: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const addIDBAnnotation = async (annotation: AnnotationIDBData) => {
  try {
    await idb.add(IDBStore.AnnotationStore, annotation);
  } catch (error) {
    throw new Error(
      `Failed to add annotation: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const removeIDBAnnotation = async (id: string) => {
  try {
    await idb.remove(IDBStore.AnnotationStore, id);
  } catch (error) {
    throw new Error(
      `Failed to remove annotation: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const updateIDBAnnotation = async (annotation: AnnotationIDBData) => {
  try {
    return await idb.put(IDBStore.AnnotationStore, annotation);
  } catch (error) {
    throw new Error(
      `Failed to update annotation: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
