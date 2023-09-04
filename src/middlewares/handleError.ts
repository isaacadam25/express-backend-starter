import { errorHandler } from '@/utils/exceptions/errorHandler';
import { NextFunction, Request, Response } from 'express';

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return errorHandler.handleError(error, res);
};
