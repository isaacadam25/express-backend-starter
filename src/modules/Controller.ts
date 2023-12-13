import { Request } from "express";
import { isEmpty } from "lodash";

// import required services
import UserService from "@/modules/users/UserService";

// import required helper utils
import HttpResponse from "@/utils/helpers/HttpResponses";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";
import { IUser } from "@/models/user/types";

class Controller extends HttpResponse {
  /**
   * @description A custom HTTP success response
   *
   * @param {string} message - The response message.
   * @param {string} data - The response data to be returned.
   * @param {string} statusCode - The response status code to be returned.
   * @returns {object} - An object indicating HTTP success response.
   */
  protected static successResponse = (
    message: string,
    data: any = null,
    statusCode: number = 200
  ): object => {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  };

  /**
   * @description Get authenticated user by their ID
   *
   * @param {Request} req - The user ID.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  protected static authUser = async (req: Request): Promise<IUser | null> => {
    const user = req.user;

    if (isEmpty(user)) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        description: "You are not authorized to access the resources",
      });
    }

    const existUser = await UserService.getUserById(user.id);
    if (isEmpty(existUser)) {
      throw new AppError({
        httpCode: HttpCode.FORBIDDEN,
        description: "You are not authorized to access the resources",
      });
    }

    return existUser;
  };
}

export default Controller;
