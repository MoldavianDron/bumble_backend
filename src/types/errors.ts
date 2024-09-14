export enum APIErrorCode {
  ERR_UNHANDLED_EXCEPTION = "ERR_UNHANDLED_EXCEPTION",
  ERR_PARAMETER_MISSING = "ERR_PARAMETER_MISSING",
  ERR_RESOURCE_EXISTS = "ERR_RESOURCE_EXISTS",
}

export class APIError<T> extends Error {
  code: APIErrorCode;
  httpStatus: number;
  details?: T;

  constructor(httpStatus: number, code: APIErrorCode, message: string, details?: T) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
    this.details = details;
  }
}

export class BadRequest<T> extends APIError<T> {
  constructor(code: APIErrorCode, message: string, details?: T) {
    super(400, code, message, details);
  }
}

export class Conflict<T> extends APIError<T> {
  constructor(code: APIErrorCode, message: string, details?: T) {
    super(409, code, message, details);
  }
}