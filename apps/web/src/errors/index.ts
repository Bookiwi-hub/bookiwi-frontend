export class IndexDBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IndexDBError";
  }
}
