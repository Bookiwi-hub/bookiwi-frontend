import { IndexDBError } from "#/errors";
// connection singleton
let dbInstance: IDBDatabase | null = null;

export interface DBConfig {
  name: string;
  version: number;
  stores: StoreConfig[];
}

export interface StoreConfig {
  name: string;
  keyPath: string;
  indices?: IndexConfig[];
  autoIncrement?: boolean;
}

export interface IndexConfig {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
}

/**
 * 데이터베이스 인스턴스 가져오기
 *
 * 현재 초기화된 데이터베이스 인스턴스를 반환합니다.
 * 데이터베이스가 초기화되지 않은 경우 null을 반환합니다.
 *
 * @returns 초기화된 데이터베이스 인스턴스 또는 초기화되지 않은 경우 null
 *
 * @example
 * // 현재 데이터베이스 인스턴스 확인
 * const db = getDB();
 * if (db) {
 *   console.log("현재 연결된 데이터베이스:", db.name);
 * } else {
 *   console.log("데이터베이스가 아직 초기화되지 않았습니다.");
 * }
 */
export const getDB = (): IDBDatabase | null => dbInstance;

/**
 * 데이터베이스 연결 닫기
 *
 * 현재 열려있는 데이터베이스 연결을 닫고 인스턴스를 정리합니다.
 * 이 함수는 애플리케이션이 종료되거나 데이터베이스 연결을 명시적으로
 * 종료해야 할 때 호출해야 합니다.
 *
 * @example
 * // 데이터베이스 연결 종료
 * closeDB();
 * console.log("데이터베이스 연결이 종료되었습니다.");
 *
 * // 연결 종료 후 상태 확인
 * const db = getDB();
 * console.log("데이터베이스 연결 상태:", db ? "연결됨" : "연결 해제됨");
 * // 결과: "데이터베이스 연결 상태: 연결 해제됨"
 */
export const closeDB = (): void => {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
};

/**
 * IndexedDB 데이터베이스 초기화 및 열기
 *
 * 지정된 구성에 따라 IndexedDB 데이터베이스를 초기화하고 엽니다.
 * 데이터베이스가 존재하지 않으면 생성하고, 이미 존재하면 해당 데이터베이스를 엽니다.
 * 데이터베이스 버전이 변경된 경우 onupgradeneeded 이벤트를 통해 스키마를 업데이트합니다.
 *
 * @param config 데이터베이스 구성 객체 (이름, 버전, 스토어 정의 포함)
 * @returns 초기화된 데이터베이스 인스턴스로 해결되는 Promise
 *
 * @example
 * // 데이터베이스 초기화 예제
 * const dbConfig: DBConfig = {
 *   name: "BookDatabase",
 *   version: 1,
 *   stores: [{
 *     name: "books",
 *     keyPath: "id",
 *     indices: [
 *       { name: "title", keyPath: "title" },
 *       { name: "author", keyPath: "author" }
 *     ]
 *   }]
 * };
 *
 * try {
 *   const db = await initDB(dbConfig);
 *   console.log("데이터베이스 초기화 성공:", db.name);
 * } catch (error) {
 *   console.error("데이터베이스 초기화 실패:", error.message);
 * }
 */
export const initDB = async (config: DBConfig): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    try {
      const existingDB = getDB();
      // 이미 열린 연결이 있는 경우 체크
      if (existingDB) {
        // 이미 동일한 DB가 열려있으면 그대로 사용
        if (existingDB.name === config.name) {
          resolve(existingDB);
          return;
        }
        // 이미 열린 연결이 있지만 다른 DB인 경우 닫고 새로 연결
        closeDB();
      }

      if (!indexedDB) {
        throw new IndexDBError("IndexedDB is not supported");
      }

      const request = indexedDB.open(config.name, config.version);

      // Handle database upgrade or creation
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores and indices
        config.stores.forEach((storeConfig) => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const store = db.createObjectStore(storeConfig.name, {
              keyPath: storeConfig.keyPath,
              autoIncrement: storeConfig.autoIncrement || false,
            });

            // Create indices if specified
            if (storeConfig.indices) {
              storeConfig.indices.forEach((indexConfig) => {
                store.createIndex(
                  indexConfig.name,
                  indexConfig.keyPath,
                  indexConfig.options,
                );
              });
            }
          }
        });
      };

      request.onsuccess = (event) => {
        dbInstance = (event.target as IDBOpenDBRequest).result;
        resolve(dbInstance);
      };

      request.onerror = (event) => {
        reject(
          new IndexDBError(
            `Failed to open database: ${(event.target as IDBOpenDBRequest).error?.message || "Unknown error"}`,
          ),
        );
      };
    } catch (error) {
      reject(
        new IndexDBError(
          `Failed to initialize database: ${(error as Error).message}`,
        ),
      );
    }
  });

/**
 * 전체 데이터베이스 삭제
 *
 * 지정된 이름의 IndexedDB 데이터베이스를 완전히 삭제합니다.
 * 이 작업은 되돌릴 수 없으며, 모든 객체 저장소와 데이터가 영구적으로 삭제됩니다.
 *
 * @param dbName 삭제할 데이터베이스 이름
 * @returns 데이터베이스가 삭제되면 해결되는 Promise
 *
 * @example
 * // 데이터베이스 삭제 예제
 * try {
 *   // 중요 작업이므로 사용자 확인 권장
 *   const isConfirmed = confirm("정말로 모든 도서 데이터를 삭제하시겠습니까?");
 *
 *   if (isConfirmed) {
 *     await deleteDatabase("BookDatabase");
 *     console.log("도서 데이터베이스가 완전히 삭제되었습니다.");
 *
 *     // 필요한 경우 UI 업데이트
 *     updateUI();
 *   } else {
 *     console.log("데이터베이스 삭제가 취소되었습니다.");
 *   }
 * } catch (error) {
 *   console.error("데이터베이스 삭제 실패:", error.message);
 * }
 */
export const deleteDatabase = async (dbName: string): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      // Close the connection first if it's open
      if (dbInstance && dbInstance.name === dbName) {
        dbInstance.close();
        dbInstance = null;
      }

      const request = indexedDB.deleteDatabase(dbName);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(
          new IndexDBError(
            `Failed to delete database: ${request.error?.message || "Unknown error"}`,
          ),
        );
      };
    } catch (error) {
      reject(
        new IndexDBError(`Delete database error: ${(error as Error).message}`),
      );
    }
  });
