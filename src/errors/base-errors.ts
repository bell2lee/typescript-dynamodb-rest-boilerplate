// eslint-disable-next-line max-classes-per-file
export class BaseError extends Error {
  protected constructor(readonly message: string, public status: number) {
    super(message);
  }
}

export class ServerError extends BaseError {
  protected constructor(message = 'Internal Error', status = 500) {
    super(message, status);
  }
}

export class ClientError extends BaseError {
  protected constructor(message = 'Bad Request', status = 400, public code = 999) {
    super(message, status);
  }
}
