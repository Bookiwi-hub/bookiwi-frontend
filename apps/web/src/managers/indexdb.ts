import { IndexDBError } from "#/errors";

/**
 * IndexedDB 관리자 클래스
 *
 * IndexedDB 데이터베이스를 관리하고 상호 작용하기 위한 클래스 기반 인터페이스를 제공합니다.
 * 각 인스턴스는 하나의 데이터베이스 연결을 관리합니다.
 */
export class IndexedDBManager {
  private db: IDBDatabase | null = null;

  /**
   * 데이터베이스가 초기화되었는지 확인
   * @returns 초기화 여부
   */
  isInitialized(): boolean {
    return this.db !== null;
  }

  /**
   * 현재 데이터베이스 인스턴스 가져오기
   * @returns 데이터베이스 인스턴스 또는 null
   */
  getDatabase(): IDBDatabase | null {
    return this.db;
  }

  /**
   * 데이터베이스 연결 닫기
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * 데이터베이스 초기화 및 열기
   *
   * @param config 데이터베이스 구성 객체
   * @returns 초기화된 데이터베이스 인스턴스로 해결되는 Promise
   *
   * @example
   * const dbManager = new IndexedDBManager();
   * const dbConfig = {
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
   *   await dbManager.init(dbConfig);
   *   console.log("데이터베이스 초기화 성공!");
   * } catch (error) {
   *   console.error("초기화 실패:", error.message);
   * }
   */
  async init(config: DBConfig): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      try {
        // 이미 열린 연결이 있는 경우 체크
        if (this.db) {
          // 이미 동일한 DB가 열려있으면 그대로 사용
          if (this.db.name === config.name) {
            resolve(this.db);
            return;
          }
          // 이미 열린 연결이 있지만 다른 DB인 경우 닫고 새로 연결
          this.close();
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
          this.db = (event.target as IDBOpenDBRequest).result;
          resolve(this.db);
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
  }

  /**
   * 트랜잭션 수행
   * @param storeName 객체 저장소 이름
   * @param mode 트랜잭션 모드
   * @param callback 트랜잭션 내에서 실행할 함수
   * @returns 콜백 함수의 결과
   */
  async transaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new IndexDBError("Database not initialized"));
        return;
      }

      try {
        const tx = this.db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        const request = callback(store);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(
            new IndexDBError(
              `Transaction failed: ${request.error?.message || "Unknown error"}`,
            ),
          );
        };

        tx.onerror = () => {
          reject(
            new IndexDBError(
              `Transaction failed: ${tx.error?.message || "Unknown error"}`,
            ),
          );
        };
      } catch (error) {
        reject(
          new IndexDBError(`Transaction error: ${(error as Error).message}`),
        );
      }
    });
  }

  /**
   * 항목 추가
   * @param storeName 객체 저장소 이름
   * @param item 추가할 항목
   * @returns 추가된 항목의 키
   */
  async add<T>(storeName: string, item: T): Promise<IDBValidKey> {
    return this.transaction<IDBValidKey>(storeName, "readwrite", (store) =>
      store.add(item as any),
    );
  }

  /**
   * 항목 추가 또는 업데이트
   * @param storeName 객체 저장소 이름
   * @param item 추가/업데이트할 항목
   * @returns 추가/업데이트된 항목의 키
   */
  async put<T>(storeName: string, item: T): Promise<IDBValidKey> {
    return this.transaction<IDBValidKey>(storeName, "readwrite", (store) =>
      store.put(item as any),
    );
  }

  /**
   * 항목 가져오기
   * @param storeName 객체 저장소 이름
   * @param key 항목 키
   * @returns 항목 또는 undefined
   */
  async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    return this.transaction<T | undefined>(storeName, "readonly", (store) =>
      store.get(key),
    );
  }

  /**
   * 항목 삭제
   * @param storeName 객체 저장소 이름
   * @param key 삭제할 항목의 키
   * @returns 작업 완료 시 undefined
   */
  async remove(storeName: string, key: IDBValidKey): Promise<undefined> {
    return this.transaction<undefined>(
      storeName,
      "readwrite",
      (store) => store.delete(key) as IDBRequest<undefined>,
    );
  }

  /**
   * 모든 항목 삭제
   * @param storeName 객체 저장소 이름
   * @returns 작업 완료 시 undefined
   */
  async clear(storeName: string): Promise<undefined> {
    return this.transaction<undefined>(
      storeName,
      "readwrite",
      (store) => store.clear() as IDBRequest<undefined>,
    );
  }

  /**
   * 모든 항목 가져오기
   * @param storeName 객체 저장소 이름
   * @returns 항목 배열
   */
  async getAll<T>(storeName: string): Promise<T[]> {
    return this.transaction<T[]>(storeName, "readonly", (store) =>
      store.getAll(),
    );
  }

  /**
   * 모든 키 가져오기
   * @param storeName 객체 저장소 이름
   * @returns 키 배열
   */
  async getAllKeys(storeName: string): Promise<IDBValidKey[]> {
    return this.transaction<IDBValidKey[]>(storeName, "readonly", (store) =>
      store.getAllKeys(),
    );
  }

  /**
   * 항목 수 계산
   * @param storeName 객체 저장소 이름
   * @returns 항목 수
   */
  async count(storeName: string): Promise<number> {
    return this.transaction<number>(storeName, "readonly", (store) =>
      store.count(),
    );
  }

  /**
   * 인덱스로 항목 검색
   * @param storeName 객체 저장소 이름
   * @param indexName 인덱스 이름
   * @param query 검색 쿼리
   * @returns 일치하는 항목 배열
   */
  async getByIndex<T>(
    storeName: string,
    indexName: string,
    query: IDBValidKey | IDBKeyRange,
  ): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new IndexDBError("Database not initialized"));
        return;
      }

      try {
        const tx = this.db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const request = index.getAll(query);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(
            new IndexDBError(
              `Index query failed: ${request.error?.message || "Unknown error"}`,
            ),
          );
        };
      } catch (error) {
        reject(
          new IndexDBError(`Index query error: ${(error as Error).message}`),
        );
      }
    });
  }

  /**
   * 커서를 사용한 항목 처리
   * @param storeName 객체 저장소 이름
   * @param callback 각 항목 처리 함수
   * @param query 선택적 쿼리
   * @param direction 선택적 커서 방향
   * @returns 작업 완료 시 Promise
   */
  async cursor<T>(
    storeName: string,
    callback: (item: T, cursor: IDBCursorWithValue) => void,
    query?: IDBValidKey | IDBKeyRange,
    direction?: IDBCursorDirection,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new IndexDBError("Database not initialized"));
        return;
      }

      try {
        const tx = this.db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const request = store.openCursor(query, direction);

        request.onsuccess = (event) => {
          const cursorResult = (event.target as IDBRequest<IDBCursorWithValue>)
            .result;
          if (cursorResult) {
            callback(cursorResult.value as T, cursorResult);
            cursorResult.continue();
          } else {
            resolve();
          }
        };

        request.onerror = () => {
          reject(
            new IndexDBError(
              `Cursor operation failed: ${request.error?.message || "Unknown error"}`,
            ),
          );
        };
      } catch (error) {
        reject(new IndexDBError(`Cursor error: ${(error as Error).message}`));
      }
    });
  }

  /**
   * 데이터베이스 삭제
   * @param dbName 삭제할 데이터베이스 이름
   * @returns 작업 완료 시 Promise
   */
  static async deleteDatabase(dbName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
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
          new IndexDBError(
            `Delete database error: ${(error as Error).message}`,
          ),
        );
      }
    });
  }

  /**
   * 키 범위 유틸리티
   */
  static keyRange = {
    /**
     * 상한 범위 생성
     * @param upper 상한값
     * @param open 상한값 제외 여부
     * @returns 키 범위
     */
    upperBound: (upper: any, open?: boolean) =>
      IDBKeyRange.upperBound(upper, open),

    /**
     * 하한 범위 생성
     * @param lower 하한값
     * @param open 하한값 제외 여부
     * @returns 키 범위
     */
    lowerBound: (lower: any, open?: boolean) =>
      IDBKeyRange.lowerBound(lower, open),

    /**
     * 범위 생성
     * @param lower 하한값
     * @param upper 상한값
     * @param lowerOpen 하한값 제외 여부
     * @param upperOpen 상한값 제외 여부
     * @returns 키 범위
     */
    bound: (lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean) =>
      IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen),

    /**
     * 단일 값 범위 생성
     * @param value 정확한 값
     * @returns 키 범위
     */
    only: (value: any) => IDBKeyRange.only(value),
  };
}

/**
 * 데이터베이스 구성 인터페이스
 */
export interface DBConfig {
  name: string;
  version: number;
  stores: StoreConfig[];
}

/**
 * 객체 저장소 구성 인터페이스
 */
export interface StoreConfig {
  name: string;
  keyPath: string;
  indices?: IndexConfig[];
  autoIncrement?: boolean;
}

/**
 * 인덱스 구성 인터페이스
 */
export interface IndexConfig {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
}

/**
 * 사용 예시
 *
 * ```typescript
 * // 데이터베이스 매니저 생성 및 초기화
 * const dbManager = new IndexedDBManager();
 *
 * const dbConfig: DBConfig = {
 *   name: "MyBookLibrary",
 *   version: 1,
 *   stores: [
 *     {
 *       name: "books",
 *       keyPath: "id",
 *       autoIncrement: false,
 *       indices: [
 *         { name: "title", keyPath: "title" },
 *         { name: "author", keyPath: "author" },
 *         { name: "year", keyPath: "year" }
 *       ]
 *     }
 *   ]
 * };
 *
 * async function initializeApp() {
 *   try {
 *     // 데이터베이스 초기화
 *     await dbManager.init(dbConfig);
 *     console.log("데이터베이스 연결 성공");
 *
 *     // 데이터 추가
 *     const book = {
 *       id: "book1",
 *       title: "자바스크립트 완벽 가이드",
 *       author: "홍길동",
 *       year: 2023
 *     };
 *     await dbManager.put("books", book);
 *     console.log("도서 추가됨");
 *
 *     // 데이터 조회
 *     const retrievedBook = await dbManager.get("books", "book1");
 *     console.log("조회된 도서:", retrievedBook);
 *
 *     // 인덱스를 사용한 검색
 *     const authorBooks = await dbManager.getByIndex("books", "author", "홍길동");
 *     console.log("홍길동의 책:", authorBooks);
 *
 *     // 작업 완료 후 연결 종료
 *     dbManager.close();
 *   } catch (error) {
 *     console.error("오류 발생:", error.message);
 *   }
 * }
 *
 * // 애플리케이션 실행
 * initializeApp();
 * ```
 */
