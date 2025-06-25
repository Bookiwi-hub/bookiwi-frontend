import idb, { IDBStore } from "#/managers/idb";
import { KiwiIDBData, ParticipantIDBData } from "#/types/idb";

export const addParticipant = async (
  kiwiId: string,
  participant: Omit<ParticipantIDBData, "id">,
) => {
  try {
    const generatedParticipantId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    // Add participant to database
    const newParticipantId = await idb.add(IDBStore.ParticipantStore, {
      ...participant,
      id: generatedParticipantId,
    });

    const kiwiData = await idb.get<KiwiIDBData>(IDBStore.KiwiStore, kiwiId);
    if (!kiwiData) {
      throw new Error("Kiwi not found");
    }
    // Update kiwi's participant IDs
    const updatedKiwi: KiwiIDBData = {
      ...kiwiData,
      participantIds: [...kiwiData.participantIds, generatedParticipantId],
    };
    await idb.put(IDBStore.KiwiStore, updatedKiwi);

    return newParticipantId;
  } catch (error) {
    throw new Error(
      `Failed to add participant: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
