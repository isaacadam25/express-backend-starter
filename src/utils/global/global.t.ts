import { ISanitizedUserResponse } from "@/modules/users/types";

// Extend the Request object's type definition to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      pagination: {
        page: number;
        limit: number;
      };
      user: ISanitizedUserResponse;
    }
  }
}
