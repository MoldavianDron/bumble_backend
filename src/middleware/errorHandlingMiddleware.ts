import {ErrorRequestHandler} from "express";

import {APIError, APIErrorCode} from "~/types";

export const errorHandlingMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof APIError) {
    return res.status(err.httpStatus).json({
      error: {
        code: err.code,
        message: err.message,
        details: err?.details
      }
    })
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: {
        code: APIErrorCode.ERR_UNHANDLED_EXCEPTION,
        message: err.message
      }
    })
  }

  res.status(500).json({
    error: {
      code: APIErrorCode.ERR_UNHANDLED_EXCEPTION,
      message: "An unhandled error occurred"
    }
  });
}