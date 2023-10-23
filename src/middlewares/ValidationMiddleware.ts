import Joi from "joi";
import { NextFunction, Request, Response } from "express";

// import helpers functions
import HttpResponse from "@/utils/helpers/HttpResponses";

class ValidationMiddleware extends HttpResponse {
  static validateBody = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json(HttpResponse.errorResponse(error.details[0].message, null));
      }

      next();
    };
  };

  static validateParams = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.params);
      if (error) {
        return res
          .status(400)
          .json(HttpResponse.errorResponse(error.details[0].message, null));
      }

      next();
    };
  };
}

export default ValidationMiddleware;
