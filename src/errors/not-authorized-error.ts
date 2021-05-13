import { BaseError } from "./base-error";

export class NotAuthorizedError extends BaseError {
  statusCode = 403;
  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "User not authorized",
      },
    ];
  }
}
