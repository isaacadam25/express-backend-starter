import { isEmpty } from "lodash";
import { NextFunction, Request, Response } from "express";

// import required helper functions
import { HttpCode } from "@/utils/enums/HttpCodeEnums";
import { AppError } from "@/utils/exceptions/AppError";
import JWT from "@/utils/helpers/JWT";
import UserUtils from "@/modules/users/UserUtils";

// import required services
import UserService from "@/modules/users/UserService";

class AuthMiddleware {
  // check user authentication middleware
  static authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "You are not authenticated. Please login",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = JWT.verifyJWT(token);

      if (typeof decodedToken === "object" && "user_id" in decodedToken) {
        // Now TypeScript knows that decodedToken is JwtPayload
        const userId: string = decodedToken.user_id;

        const existUser = await UserService.getUserById(userId);
        if (isEmpty(existUser)) {
          throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: "You are not authenticated. Please login",
          });
        }

        const user = UserUtils.sanitizeUser(existUser);

        req.user = user;

        next();
      } else {
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "You are not authenticated. Please login",
        });
      }
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "You are not authenticated. Please login",
      });
    }
  };

  // check user authorization middleware
  static authorizeUser =
    (permissionName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user.id;

      const existUser = await UserService.getUserById(userId);
      if (isEmpty(existUser)) {
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description:
            "You are not authorized. Please contact your admin 1" + userId,
        });
      }

      const { role } = existUser;

      const isAllowed = role.permissions.find(
        (permission) => permission.generic_name === permissionName
      );

      if (isAllowed) {
        next();
      } else {
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "You are not authorized. Please contact your admin 2",
        });
      }
    };
}

export default AuthMiddleware;
