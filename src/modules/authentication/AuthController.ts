import { Request, RequestHandler, Response } from "express";
import { isEmpty } from "lodash";

// import required services
import AuthService from "@/modules/authentication/AuthService";
import UserService from "@/modules/users/UserService";

// import required helper functions
import Controller from "@/modules/Controller";
import Encryption from "@/utils/helpers/Encryption";
import JWT from "@/utils/helpers/JWT";
import Utils from "@/utils/helpers/Utils";
import AuthUtils from "@/modules/authentication/AuthUtils";
import UserUtils from "@/modules/users/UserUtils";
import { AppError } from "@/utils/exceptions/AppError";

// import required types
import { HttpCode } from "@/utils/enums/HttpCodeEnums";
import {
  IChangePassword,
  IUserLoginPayload,
} from "@/modules/authentication/types";

class AuthController extends Controller {
  /**
   * @description User login function
   *
   * @route /auth/login
   * @method POST
   * @access Public
   *
   * @param {Request} req - The request object containing user credentials payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the status of the user login responses.
   * @throws {AppError} If the credentials are invalid.
   */
  static userLogin: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const payload: IUserLoginPayload = req.body;

    const phoneNumber = Utils.formatPhoneNumber(payload.phoneNumber);
    const existUser = await AuthService.getUserByPhoneNumber(phoneNumber);
    if (isEmpty(existUser)) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Invalid credentials entered",
      });
    }

    const comparedPassword = await Encryption.decrypt(
      payload.password,
      existUser.password
    );
    if (!comparedPassword) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Invalid credentials entered",
      });
    }

    const token = JWT.assignJWT({ user_id: existUser._id });

    const response = AuthUtils.sanitizeResponse(existUser, token);

    return res
      .status(200)
      .json(this.successResponse("User successfully logged in", response));
  };

  /**
   * @description Get details of the current logged in user.
   *
   * @route /auth
   * @method GET
   * @access Private
   *
   * @param {Request} req - The http request object.
   * @param {Response} res - The response object used to send the response to the user.
   * @returns {Response} A response indicating the details of the current logged in user.
   */
  static getAuthUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    return res.json(this.successResponse("Auth user retrieved successfully"));
  };

  /**
   * @description Change current user password
   *
   * @route /auth/change-password
   * @method POST
   * @access Private
   *
   * @param {Request} req - The request object containing user passwords.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the status of the user changed password response.
   * @throws {AppError} If the passwords are incorrect.
   * @throws {AppError} If the user details are not found.
   */
  static changePassword: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const payload: IChangePassword = req.body;
    const user = req.user;

    if (payload.new_password !== payload.confirm_password) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "New password does not match with confirm password",
      });
    }

    // compare password
    if (payload.password === payload.new_password) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "New password can not be equal to current password",
      });
    }

    const existUser = await UserService.getUserById(user.id);
    if (isEmpty(existUser)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Account details not found. Contact customer support",
      });
    }

    const comparedPassword = await Encryption.decrypt(
      payload.password,
      existUser.password
    );
    if (!comparedPassword) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Password does not match",
      });
    }

    const encryptedPassword = await Encryption.encrypt(payload.new_password);

    const updatedUser = await UserService.updateUserPassword(
      user.id,
      encryptedPassword
    );
    if (isEmpty(updatedUser)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to update user password. Try again later",
      });
    }

    return res
      .status(200)
      .json(
        this.successResponse(
          "Password changed successfully",
          UserUtils.sanitizeUser(updatedUser)
        )
      );
  };
}

export default AuthController;
