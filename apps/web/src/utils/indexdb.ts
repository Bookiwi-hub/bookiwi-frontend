// connection singleton
let dbInstance: IDBDatabase | null = null;

/**
 * 데이터베이스 이름, 버전 및 객체 저장소 구성을 정의합니다.
 *
 */
export interface DBConfig {
  name: string;
  version: number;
  stores: StoreConfig[];
}

/**
 * 객체 저장소 구성 인터페이스
 *
 * 객체 저장소의 이름, 키 경로, 인덱스 및 자동 증가 설정을 정의합니다.
 * 데이터베이스 내에서 데이터를 저장하는 테이블과 같은 역할을 합니다.
 *
 */
export interface StoreConfig {
  name: string;
  keyPath: string;
  indices?: IndexConfig[];
  autoIncrement?: boolean;
}

/**
 * 인덱스 구성 인터페이스
 *
 * 객체 저장소의 인덱스 이름, 키 경로 및 옵션을 정의합니다.
 * 인덱스는 특정 필드를 기준으로 데이터를 빠르게 검색하는 데 사용됩니다.
 *
 * @example
 * const titleIndex: IndexConfig = {
 *   name: "title",          // 인덱스 이름
 *   keyPath: "title",       // 인덱싱할 필드
 *   options: { unique: false }  // 중복 값 허용 여부 등의 옵션
 * };
 */
export interface IndexConfig {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
}

/**
 * IndexedDB 오류 래퍼 클래스
 *
 * IndexedDB 작업 중 발생한 오류를 표준화하여 처리합니다.
 * 모든 IndexedDB 관련 오류는 이 클래스의 인스턴스로 래핑됩니다.
 */
export class IndexDBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IndexDBError";
  }
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
 * 데이터베이스 트랜잭션 수행
 *
 * 지정된 객체 저장소에 대해 트랜잭션을 수행합니다.
 * 이 함수는 대부분의 IndexedDB 작업의 기반이 되는 저수준 유틸리티입니다.
 * 트랜잭션 내에서 실행할 콜백 함수를 제공하여 IndexedDB 작업을 수행합니다.
 *
 * @param storeName 작업할 객체 저장소 이름
 * @param mode 트랜잭션 모드 ('readonly' 또는 'readwrite')
 * @param callback 트랜잭션 내에서 실행할 함수
 * @returns 콜백 함수의 결과로 해결되는 Promise
 *
 * @example
 * // 저수준 트랜잭션 사용 예제
 * try {
 *   const count = await transaction<number>("books", "readonly", (store) => {
 *     return store.count();
 *   });
 *   console.log("도서 총 수:", count);
 * } catch (error) {
 *   console.error("트랜잭션 실패:", error.message);
 * }
 */
export const transaction = async <T>(
  storeName: string,
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> =>
  new Promise((resolve, reject) => {
    if (!dbInstance) {
      reject(new IndexDBError("Database not initialized"));
      return;
    }

    try {
      const tx = dbInstance.transaction(storeName, mode);
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

/**
 * 객체 저장소에 항목 추가
 *
 * 지정된 객체 저장소에 새 항목을 추가합니다.
 * 이미 동일한 키를 가진 항목이 있는 경우 오류가 발생합니다.
 * 중복 키 충돌 없이 항목을 추가하거나 업데이트하려면 put 함수를 사용하세요.
 *
 * @param storeName 항목을 추가할 객체 저장소 이름
 * @param item 추가할 항목 객체
 * @returns 추가된 항목의 키로 해결되는 Promise
 *
 * @example
 * // 새 도서 추가 예제
 * const newBook = {
 *   id: "book-1",
 *   title: "JavaScript 완벽 가이드",
 *   author: "홍길동",
 *   year: 2023
 * };
 *
 * try {
 *   const key = await add("books", newBook);
 *   console.log("새 도서가 추가되었습니다. 키:", key);
 *   // 결과: "새 도서가 추가되었습니다. 키: book-1"
 * } catch (error) {
 *   // 이미 같은 키를 가진 항목이 있는 경우 오류 발생
 *   console.error("도서 추가 실패:", error.message);
 * }
 */
export const add = async <T>(
  storeName: string,
  item: T,
): Promise<IDBValidKey> =>
  transaction<IDBValidKey>(storeName, "readwrite", (store) =>
    store.add(item as any),
  );

/**
 * 객체 저장소에 항목 추가 또는 업데이트
 *
 * 지정된 객체 저장소에 항목을 추가하거나 이미 존재하는 경우 업데이트합니다.
 * 항목의 키가 저장소에 이미 존재하면 항목이 업데이트되고, 그렇지 않으면 새 항목이 추가됩니다.
 * 항목을 무조건 새로 추가하고 싶다면 add 함수를 사용하세요.
 *
 * @param storeName 항목을 추가/업데이트할 객체 저장소 이름
 * @param item 추가/업데이트할 항목 객체
 * @returns 추가/업데이트된 항목의 키로 해결되는 Promise
 *
 * @example
 * // 도서 업데이트 예제
 * const updatedBook = {
 *   id: "book-1",              // 기존 키와 동일
 *   title: "JavaScript 완벽 가이드 개정판",
 *   author: "홍길동",
 *   year: 2024
 * };
 *
 * try {
 *   const key = await put("books", updatedBook);
 *   console.log("도서가 업데이트되었습니다. 키:", key);
 *   // 결과: "도서가 업데이트되었습니다. 키: book-1"
 * } catch (error) {
 *   console.error("도서 업데이트 실패:", error.message);
 * }
 */
export const put = async <T>(
  storeName: string,
  item: T,
): Promise<IDBValidKey> =>
  transaction<IDBValidKey>(storeName, "readwrite", (store) =>
    store.put(item as any),
  );

/**
 * 객체 저장소에서 항목 가져오기
 *
 * 지정된 키를 사용하여 객체 저장소에서 항목을 검색합니다.
 * 항목이 존재하지 않는 경우 undefined를 반환합니다.
 *
 * @param storeName 항목을 검색할 객체 저장소 이름
 * @param key 검색할 항목의 키
 * @returns 검색된 항목 또는 항목이 없는 경우 undefined로 해결되는 Promise
 *
 * @example
 * // 도서 조회 예제
 * try {
 *   const book = await get("books", "book-1");
 *
 *   if (book) {
 *     console.log("도서를 찾았습니다:", book);
 *     // 결과: "도서를 찾았습니다: {id: 'book-1', title: '...', ...}"
 *   } else {
 *     console.log("해당 키의 도서가 존재하지 않습니다.");
 *   }
 * } catch (error) {
 *   console.error("도서 조회 실패:", error.message);
 * }
 */
export const get = async <T>(
  storeName: string,
  key: IDBValidKey,
): Promise<T | undefined> =>
  transaction<T | undefined>(storeName, "readonly", (store) => store.get(key));

/**
 * 객체 저장소에서 항목 삭제
 *
 * 지정된 키로 객체 저장소에서 항목을 삭제합니다.
 * 해당 키가 저장소에 존재하지 않는 경우에도 오류가 발생하지 않습니다.
 *
 * @param storeName 항목을 삭제할 객체 저장소 이름
 * @param key 삭제할 항목의 키
 * @returns 항목이 삭제되면 undefined로 해결되는 Promise
 *
 * @example
 * // 도서 삭제 예제
 * try {
 *   await remove("books", "book-1");
 *   console.log("도서가 성공적으로 삭제되었습니다.");
 *
 *   // 삭제 확인
 *   const book = await get("books", "book-1");
 *   console.log("삭제된 도서 조회 결과:", book);
 *   // 결과: "삭제된 도서 조회 결과: undefined"
 * } catch (error) {
 *   console.error("도서 삭제 실패:", error.message);
 * }
 */
export const remove = async (
  storeName: string,
  key: IDBValidKey,
): Promise<undefined> =>
  transaction<undefined>(
    storeName,
    "readwrite",
    (store) => store.delete(key) as IDBRequest<undefined>,
  );

/**
 * 객체 저장소의 모든 항목 삭제
 *
 * 지정된 객체 저장소의 모든 항목을 삭제합니다.
 * 저장소 자체는 삭제되지 않고 비워집니다.
 *
 * @param storeName 모든 항목을 삭제할 객체 저장소 이름
 * @returns 저장소가 비워지면 undefined로 해결되는 Promise
 *
 * @example
 * // 모든 도서 삭제 예제
 * try {
 *   // 먼저 현재 도서 수 확인
 *   const countBefore = await count("books");
 *   console.log("초기 도서 수:", countBefore);
 *
 *   // 모든 도서 삭제
 *   await clear("books");
 *   console.log("모든 도서가 삭제되었습니다.");
 *
 *   // 삭제 후 도서 수 확인
 *   const countAfter = await count("books");
 *   console.log("삭제 후 도서 수:", countAfter);
 *   // 결과: "삭제 후 도서 수: 0"
 * } catch (error) {
 *   console.error("도서 삭제 실패:", error.message);
 * }
 */
export const clear = async (storeName: string): Promise<undefined> =>
  transaction<undefined>(
    storeName,
    "readwrite",
    (store) => store.clear() as IDBRequest<undefined>,
  );

/**
 * 객체 저장소의 모든 항목 가져오기
 *
 * 지정된 객체 저장소의 모든 항목을 배열로 가져옵니다.
 * 저장소가 비어있는 경우 빈 배열을 반환합니다.
 *
 * @param storeName 항목을 가져올 객체 저장소 이름
 * @returns 저장소의 모든 항목을 포함하는 배열로 해결되는 Promise
 *
 * @example
 * // 모든 도서 가져오기 예제
 * try {
 *   const allBooks = await getAll("books");
 *
 *   console.log("총 도서 수:", allBooks.length);
 *
 *   if (allBooks.length > 0) {
 *     console.log("도서 목록:");
 *     allBooks.forEach((book, index) => {
 *       console.log(`${index + 1}. ${book.title} (${book.author})`);
 *     });
 *   } else {
 *     console.log("저장된 도서가 없습니다.");
 *   }
 * } catch (error) {
 *   console.error("도서 조회 실패:", error.message);
 * }
 */
export const getAll = async <T>(storeName: string): Promise<T[]> =>
  transaction<T[]>(storeName, "readonly", (store) => store.getAll());

/**
 * 객체 저장소의 모든 키 가져오기
 *
 * 지정된 객체 저장소의 모든 키를 배열로 가져옵니다.
 * 저장소가 비어있는 경우 빈 배열을 반환합니다.
 *
 * @param storeName 키를 가져올 객체 저장소 이름
 * @returns 저장소의 모든 키를 포함하는 배열로 해결되는 Promise
 *
 * @example
 * // 모든 도서 키 가져오기 예제
 * try {
 *   const allKeys = await getAllKeys("books");
 *
 *   console.log("총 도서 키 수:", allKeys.length);
 *
 *   if (allKeys.length > 0) {
 *     console.log("도서 키 목록:");
 *     allKeys.forEach((key, index) => {
 *       console.log(`${index + 1}. ${key}`);
 *     });
 *
 *     // 첫 번째 키로 도서 가져오기
 *     const firstBook = await get("books", allKeys[0]);
 *     console.log("첫 번째 도서:", firstBook);
 *   } else {
 *     console.log("저장된 도서가 없습니다.");
 *   }
 * } catch (error) {
 *   console.error("도서 키 조회 실패:", error.message);
 * }
 */
export const getAllKeys = async (storeName: string): Promise<IDBValidKey[]> =>
  transaction<IDBValidKey[]>(storeName, "readonly", (store) =>
    store.getAllKeys(),
  );

/**
 * 객체 저장소의 항목 수 계산
 *
 * 지정된 객체 저장소에 있는 항목의 총 개수를 반환합니다.
 *
 * @param storeName 항목 수를 계산할 객체 저장소 이름
 * @returns 항목 수로 해결되는 Promise
 *
 * @example
 * // 도서 수 계산 예제
 * try {
 *   const bookCount = await count("books");
 *
 *   console.log(`도서관에는 총 ${bookCount}권의 책이 있습니다.`);
 *
 *   // 조건에 따라 다른 작업 수행
 *   if (bookCount > 100) {
 *     console.log("대형 도서 컬렉션입니다.");
 *   } else if (bookCount > 0) {
 *     console.log("도서가 있습니다.");
 *   } else {
 *     console.log("도서가 없습니다.");
 *   }
 * } catch (error) {
 *   console.error("도서 수 계산 실패:", error.message);
 * }
 */
export const count = async (storeName: string): Promise<number> =>
  transaction<number>(storeName, "readonly", (store) => store.count());

/**
 * 인덱스를 사용하여 항목 쿼리하기
 *
 * 지정된 인덱스와 쿼리 값을 사용하여 객체 저장소에서 항목을 검색합니다.
 * 인덱스는 객체 저장소를 초기화할 때 미리 정의되어 있어야 합니다.
 *
 * @param storeName 검색할 객체 저장소 이름
 * @param indexName 사용할 인덱스 이름
 * @param query 검색할 값 또는 범위
 * @returns 일치하는 항목 배열로 해결되는 Promise
 *
 * @example
 * // 저자별 도서 검색 예제
 * try {
 *   // "author" 인덱스를 사용하여 특정 저자의 모든 책 검색
 *   const authorBooks = await getByIndex("books", "author", "홍길동");
 *
 *   console.log(`'홍길동' 저자의 도서 수: ${authorBooks.length}`);
 *
 *   if (authorBooks.length > 0) {
 *     console.log("도서 목록:");
 *     authorBooks.forEach((book, index) => {
 *       console.log(`${index + 1}. ${book.title} (${book.year})`);
 *     });
 *   } else {
 *     console.log("해당 저자의 도서가 없습니다.");
 *   }
 *
 *   // 범위 검색 예제 (keyRange 사용)
 *   const recentBooks = await getByIndex("books", "year", keyRange.lowerBound(2020));
 *   console.log(`2020년 이후 출판된 도서 수: ${recentBooks.length}`);
 * } catch (error) {
 *   console.error("도서 검색 실패:", error.message);
 * }
 */
export const getByIndex = async <T>(
  storeName: string,
  indexName: string,
  query: IDBValidKey | IDBKeyRange,
): Promise<T[]> =>
  new Promise((resolve, reject) => {
    if (!dbInstance) {
      reject(new IndexDBError("Database not initialized"));
      return;
    }

    try {
      const tx = dbInstance.transaction(storeName, "readonly");
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

/**
 * 커서를 사용하여 항목 반복 처리
 *
 * 객체 저장소의 항목을 하나씩 반복하면서 각 항목에 대해 콜백 함수를 실행합니다.
 * 대량의 데이터를 처리하거나, 조건에 따라 항목을 처리해야 할 때 유용합니다.
 *
 * @param storeName 반복할 객체 저장소 이름
 * @param callback 각 항목을 처리할 함수
 * @param query 선택적 필터링 쿼리
 * @param direction 선택적 커서 방향
 * @returns 반복이 완료되면 해결되는 Promise
 *
 * @example
 * // 커서를 사용한 도서 처리 예제
 * try {
 *   let expensiveBooks = 0;
 *   let totalValue = 0;
 *
 *   // 모든 도서를 반복하면서 가격 통계 계산
 *   await cursor("books", (book, cursor) => {
 *     totalValue += book.price || 0;
 *
 *     if (book.price > 20000) {
 *       expensiveBooks++;
 *       console.log(`고가 도서: ${book.title} (${book.price}원)`);
 *     }
 *
 *     // 원하는 경우 항목 수정 가능
 *     if (book.status === "대출 가능" && book.lastUpdated < Date.now() - 86400000) {
 *       // 24시간 이상 된 항목 업데이트
 *       book.status = "확인 필요";
 *       cursor.update(book);
 *     }
 *   });
 *
 *   console.log(`총 도서 가치: ${totalValue}원`);
 *   console.log(`고가 도서 수: ${expensiveBooks}`);
 * } catch (error) {
 *   console.error("도서 처리 실패:", error.message);
 * }
 *
 * // 특정 범위만 처리하는 예제
 * try {
 *   // 2020년부터 2022년 사이의 도서만 처리
 *   const yearRange = keyRange.bound(2020, 2022);
 *
 *   await cursor("books", (book) => {
 *     console.log(`${book.year}년 출판: ${book.title}`);
 *   }, yearRange);
 * } catch (error) {
 *   console.error("도서 처리 실패:", error.message);
 * }
 */
export const cursor = async <T>(
  storeName: string,
  callback: (item: T, cursor: IDBCursorWithValue) => void,
  query?: IDBValidKey | IDBKeyRange,
  direction?: IDBCursorDirection,
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!dbInstance) {
      reject(new IndexDBError("Database not initialized"));
      return;
    }

    try {
      const tx = dbInstance.transaction(storeName, "readonly");
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

export const keyRange = {
  /**
   * 상한 범위 생성
   *
   * 지정된 값보다 작거나 같은 값을 검색하기 위한 범위를 생성합니다.
   * open 매개변수를 true로 설정하면 상한값을 제외합니다.
   *
   * @param upper 상한값
   * @param open 상한값 제외 여부 (기본값: false)
   * @returns 생성된 키 범위
   *
   * @example
   * // 가격이 15000원 이하인 도서 검색
   * const affordableBooks = await getByIndex("books", "price", keyRange.upperBound(15000));
   *
   * // 가격이 15000원 미만인 도서 검색 (15000원 제외)
   * const cheaperBooks = await getByIndex("books", "price", keyRange.upperBound(15000, true));
   */
  upperBound: (upper: any, open?: boolean) =>
    IDBKeyRange.upperBound(upper, open),

  /**
   * 하한 범위 생성
   *
   * 지정된 값보다 크거나 같은 값을 검색하기 위한 범위를 생성합니다.
   * open 매개변수를 true로 설정하면 하한값을 제외합니다.
   *
   * @param lower 하한값
   * @param open 하한값 제외 여부 (기본값: false)
   * @returns 생성된 키 범위
   *
   * @example
   * // 가격이 10000원 이상인 도서 검색
   * const expensiveBooks = await getByIndex("books", "price", keyRange.lowerBound(10000));
   *
   * // 가격이 10000원 초과인 도서 검색 (10000원 제외)
   * const moreExpensiveBooks = await getByIndex("books", "price", keyRange.lowerBound(10000, true));
   */
  lowerBound: (lower: any, open?: boolean) =>
    IDBKeyRange.lowerBound(lower, open),

  /**
   * 범위 생성
   *
   * 하한값과 상한값 사이의 값을 검색하기 위한 범위를 생성합니다.
   * lowerOpen 매개변수를 true로 설정하면 하한값을 제외합니다.
   * upperOpen 매개변수를 true로 설정하면 상한값을 제외합니다.
   *
   * @param lower 하한값
   * @param upper 상한값
   * @param lowerOpen 하한값 제외 여부 (기본값: false)
   * @param upperOpen 상한값 제외 여부 (기본값: false)
   * @returns 생성된 키 범위
   *
   * @example
   * // 가격이 10000원 이상 20000원 이하인 도서 검색
   * const midPriceBooks = await getByIndex("books", "price", keyRange.bound(10000, 20000));
   *
   * // 가격이 10000원 초과 20000원 미만인 도서 검색 (양쪽 경계값 제외)
   * const strictMidPriceBooks = await getByIndex("books", "price", keyRange.bound(10000, 20000, true, true));
   */
  bound: (lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean) =>
    IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen),

  /**
   * 단일 값 범위 생성
   *
   * 정확히 지정된 값과 일치하는 항목을 검색하기 위한 범위를 생성합니다.
   *
   * @param value 검색할 정확한 값
   * @returns 생성된 키 범위
   *
   * @example
   * // 정확히 15000원인 도서 검색
   * const exactPriceBooks = await getByIndex("books", "price", keyRange.only(15000));
   *
   * // 정확히 "판타지" 장르의 도서 검색
   * const fantasyBooks = await getByIndex("books", "genre", keyRange.only("판타지"));
   */
  only: (value: any) => IDBKeyRange.only(value),
};
