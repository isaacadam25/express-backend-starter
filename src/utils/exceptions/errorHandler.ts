import { Response } from "express";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  // -> handle occurred trusted error
  private handleTrustedError(error: AppError, response: Response): void {
    response.status(error.httpCode).json({
      success: false,
      statusCode: error.httpCode,
      message: error.message,
      data: null,
    });
  }

  // -> handle occurred critical error
  private handleCriticalError(
    error: Error | AppError,
    response?: Response
  ): void {
    if (response) {
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: "Internal server error occurred. Try again later",
        message: error.message,
        stack: error.stack,
        data: null,
      });
    }

    console.log("Application encountered a critical error. Exiting");
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
