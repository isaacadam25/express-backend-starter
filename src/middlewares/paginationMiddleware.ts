import { Request, Response, NextFunction } from "express";

interface PaginationData {
  page: number;
  limit: number;
}

const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  req.pagination = {
    page,
    limit,
  } as PaginationData;

  next();
};

export default paginationMiddleware;
