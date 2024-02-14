export interface ILogger {
  setContext(context: string): void;
  log(message: string): void;
  error(message: string): void;
  httpError(message: string, error: string): void;
  createEntityError(error: any, entity: string): void;
}
