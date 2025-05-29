import { SAMPLE_KIWI_ID } from "#/constants/kiwi";
import idb from "#/managers/idb";
import { Kiwi, KiwiDB } from "#/types/kiwi";
import { blobToObjectUrl } from "#/utils/file";

const getKiwisFromIndexedDB = async (): Promise<Kiwi[]> => {
  try {
    const kiwiDB = await idb.getAll("kiwis");

    // 데이터가 없으면 빈 배열 반환
    if (!kiwiDB || kiwiDB.length === 0) {
      return [];
    }

    // SAMPLE_KIWI_ID에 해당하는 kiwi 제외
    const filteredKiwiDB = (kiwiDB as KiwiDB[]).filter(
      (kiwiItem) => kiwiItem.id !== SAMPLE_KIWI_ID,
    );

    const kiwis = await Promise.all(
      filteredKiwiDB.map(async (kiwiItem) => {
        const { coverImage } = kiwiItem;
        const coverImageObjectUrl = coverImage
          ? await blobToObjectUrl(coverImage)
          : null;

        return {
          ...kiwiItem,
          coverImage: coverImageObjectUrl,
        };
      }),
    );

    return kiwis as Kiwi[];
  } catch (error) {
    alert("데이터를 불러오는 데 실패했습니다");
    return [];
  }
};

export default getKiwisFromIndexedDB;
