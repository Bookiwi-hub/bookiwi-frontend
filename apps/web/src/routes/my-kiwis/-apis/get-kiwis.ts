import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { KiwiIDBData } from "#/types/idb";
import { Kiwi } from "#/types/kiwi";
import { kiwIDBDataToKiwi } from "#/utils/idb";

/**
 * IndexedDB에서 키위 목록을 가져오는 함수
 */
const getKiwisFromIDB = async (): Promise<Kiwi[]> => {
  try {
    const kiwiStoreData = await idb.getAll<KiwiIDBData>(IDBStore.KiwiStore);

    // 데이터가 없으면 빈 배열 반환
    if (!kiwiStoreData || kiwiStoreData.length === 0) {
      return [];
    }

    const kiwis = await Promise.all(kiwiStoreData.map(kiwIDBDataToKiwi));

    return kiwis;
  } catch (error) {
    alert("데이터를 불러오는 데 실패했습니다");
    return [];
  }
};

export default getKiwisFromIDB;
