import { Request } from "express";

// Extend the Request object's type definition to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any; // You can replace 'any' with the actual type of 'user'
    }
  }
}
