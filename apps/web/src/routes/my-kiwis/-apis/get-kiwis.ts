import idb from "#/managers/indexed-db";
import { Kiwi, KiwiDB } from "#/types/kiwi";
import { blobToObjectUrl } from "#/utils/file";

export const getKiwisFromIndexedDB = async (): Promise<Kiwi[]> => {
  try {
    const kiwiDB = await idb.getAll("kiwis");

    // 데이터가 없으면 빈 배열 반환
    if (!kiwiDB || kiwiDB.length === 0) {
      return [];
    }

    const kiwis = await Promise.all(
      (kiwiDB as KiwiDB[]).map(async (kiwiItem) => {
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
