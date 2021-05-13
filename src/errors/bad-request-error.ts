import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
  statusCode = 400;
  constructor() {
    super();
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Request did not complete",
      },
    ];
  }
}
