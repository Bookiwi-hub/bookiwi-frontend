import { IDBStore, SAMPLE_KIWI_DATA_ID } from "#/constants/idb";
import idb from "#/managers/idb";
import { KiwiIDBData } from "#/types/idb";
import { Kiwi } from "#/types/kiwi";
import { kiwIDBDataToKiwi } from "#/utils/idb";

const getSampleKiwi = async (): Promise<Kiwi | null> => {
  try {
    // 기존 sample-kiwi 데이터 확인
    const existingSampleKiwiIDBData = await idb.get<KiwiIDBData>(
      IDBStore.KiwiStore,
      SAMPLE_KIWI_DATA_ID,
    );

    if (!existingSampleKiwiIDBData) {
      return null;
    }

    const sampleKiwi = await kiwIDBDataToKiwi(existingSampleKiwiIDBData);

    return sampleKiwi;
  } catch (error) {
    throw new Error(
      `Failed to fetch book: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export default getSampleKiwi;
