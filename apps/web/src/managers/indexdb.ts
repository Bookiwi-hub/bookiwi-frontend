import { IndexDBError } from "#/errors";

export class IndexedDBManager {
  private db: IDBDatabase;

  constructor(indexedDB: IDBDatabase) {
    this.db = indexedDB;
  }

  /**
   * 현재 데이터베이스 인스턴스 가져오기
   * @returns 데이터베이스 인스턴스 또는 null
   * @example
   * ```ts
   * const dbInstance = dbManager.database;
   * if (dbInstance) {
   *   // 데이터베이스 인스턴스 사용
   *   console.log("Database name:", dbInstance.name);
   * }
   * ```
   */
  get database() {
    return this.db;
  }

  /**
   * 트랜잭션 수행
   * @param storeName 객체 저장소 이름
   * @param mode 트랜잭션 모드
   * @param callback 트랜잭션 내에서 실행할 함수
   * @returns 콜백 함수의 결과
   * @example
   * ```ts
   * const result = await dbManager.transaction('users', 'readonly', (store) => {
   *   return store.get('user123');
   * });
   * console.log("Transaction result:", result);
   * ```
   */
  async transaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
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
   * @example
   * ```ts
   * // 새 사용자 추가
   * const newUser = { id: 'user123', name: 'John Doe', email: 'john@example.com' };
   * const key = await dbManager.add('users', newUser);
   * console.log("Added user with key:", key);
   * ```
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
   * @example
   * ```ts
   * // 사용자 정보 업데이트
   * const updatedUser = { id: 'user123', name: 'John Smith', email: 'john@example.com' };
   * const key = await dbManager.put('users', updatedUser);
   * console.log("Updated user with key:", key);
   * ```
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
   * @example
   * ```ts
   * // ID로 사용자 검색
   * const user = await dbManager.get('users', 'user123');
   * if (user) {
   *   console.log("Found user:", user.name);
   * } else {
   *   console.log("User not found");
   * }
   * ```
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
   * @example
   * ```ts
   * // 사용자 삭제
   * await dbManager.remove('users', 'user123');
   * console.log("User removed successfully");
   * ```
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
   * @example
   * ```ts
   * // 모든 사용자 삭제
   * await dbManager.clear('users');
   * console.log("All users cleared from database");
   * ```
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
   * @example
   * ```ts
   * // 모든 사용자 가져오기
   * const allUsers = await dbManager.getAll('users');
   * console.log(`Found ${allUsers.length} users`);
   * allUsers.forEach(user => {
   *   console.log(`- ${user.name} (${user.email})`);
   * });
   * ```
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
   * @example
   * ```ts
   * // 모든 사용자 ID 가져오기
   * const userIds = await dbManager.getAllKeys('users');
   * console.log(`Found ${userIds.length} user IDs`);
   * userIds.forEach(id => {
   *   console.log(`- User ID: ${id}`);
   * });
   * ```
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
   * @example
   * ```ts
   * // 사용자 수 계산
   * const userCount = await dbManager.count('users');
   * console.log(`Database contains ${userCount} users`);
   * ```
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
   * @example
   * ```ts
   * // 이메일 도메인으로 사용자 검색
   * const emailQuery = IDBKeyRange.bound('example.com', 'example.com\uffff');
   * const users = await dbManager.getByIndex('users', 'emailIndex', emailQuery);
   * console.log(`Found ${users.length} users with example.com email`);
   *
   * // 정확한 값으로 검색
   * const adminUsers = await dbManager.getByIndex('users', 'roleIndex', 'admin');
   * console.log(`Found ${adminUsers.length} admin users`);
   * ```
   */
  async getByIndex<T>(
    storeName: string,
    indexName: string,
    query: IDBValidKey | IDBKeyRange,
  ): Promise<T[]> {
    return new Promise((resolve, reject) => {
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
   * @example
   * ```ts
   * // 모든 사용자를 처리하고 이름 출력
   * await dbManager.cursor('users', (user, cursor) => {
   *   console.log(`Processing user: ${user.name}`);
   *   // 커서를 조작하려면 cursor 매개변수 사용
   * });
   *
   * // 특정 범위의 사용자만 처리
   * const idRange = IDBKeyRange.bound('user100', 'user200');
   * await dbManager.cursor('users', (user, cursor) => {
   *   console.log(`Processing user in range: ${user.id}, ${user.name}`);
   * }, idRange);
   *
   * // 역순으로 처리
   * await dbManager.cursor('users', (user, cursor) => {
   *   console.log(`Processing user in reverse: ${user.name}`);
   * }, null, 'prev');
   * ```
   */
  async cursor<T>(
    storeName: string,
    callback: (item: T, cursor: IDBCursorWithValue) => void,
    query?: IDBValidKey | IDBKeyRange,
    direction?: IDBCursorDirection,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
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

  static getBoundRange(
    lower: any,
    upper: any,
    lowerOpen?: boolean,
    upperOpen?: boolean,
  ) {
    return IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen);
  }

  static getUpperBoundRange(upper: any, open?: boolean) {
    return IDBKeyRange.upperBound(upper, open);
  }

  static getLowerBoundRange(lower: any, open?: boolean) {
    return IDBKeyRange.lowerBound(lower, open);
  }

  static getOnlyRange(value: any) {
    return IDBKeyRange.only(value);
  }
}
