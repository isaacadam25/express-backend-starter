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
import {
  IChangePassword,
  IUserLoginPayload,
} from "@/modules/authentication/types";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

class AuthController extends Controller {
  /**
   * User login function
   *
   * @method POST
   * @route /auth/login
   * @access public
   */
  static userLogin: RequestHandler = async (req: Request, res: Response) => {
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
   * Get current user logged in details
   *
   * @method GET
   * @route /auth
   * @access private
   */
  static getAuthUser: RequestHandler = async (req: Request, res: Response) => {
    return res.json(this.successResponse("Auth user retrieved successfully"));
  };

  /**
   * Change user password
   *
   * @method POST
   * @route /auth/change-password
   * @access private
   */
  static changePassword: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
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
