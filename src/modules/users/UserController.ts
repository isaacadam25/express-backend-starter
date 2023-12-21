import { Request, Response } from "express";
import { isEmpty } from "lodash";

// import required services
import RoleService from "@/modules/roles/RoleService";
import UserService from "@/modules/users/UserService";

// import required helper functions
import UserUtils from "@/modules/users/UserUtils";
import Utils from "@/utils/helpers/Utils";
import Controller from "@/modules/Controller";
import Encryption from "@/utils/helpers/Encryption";
import { AppError } from "@/utils/exceptions/AppError";

// import required types
import { HttpCode } from "@/utils/enums/HttpCodeEnums";
import { IUserPayload } from "@/modules/users/types";

class UserController extends Controller {
  /**
   * @description Create new user
   *
   * @route /users
   * @method POST
   * @access Private
   *
   * @param {Request} req - The request object user details payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the created user details.
   * @throws {AppError} If the user email already exists.
   * @throws {AppError} If the user phone number already exists.
   * @throws {AppError} If the user role does not exists.
   * @throws {AppError} If error occurred during user creation
   */
  static createUser = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const payload: IUserPayload = req.body;

    const formattedUser = UserUtils.formatUser(payload);

    const existEmail = await UserService.getUserByEmail(formattedUser.email);
    if (!isEmpty(existEmail)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Email already exist. Try another email",
      });
    }

    const existPhoneNumber = await UserService.getUserByPhoneNumber(
      Utils.formatPhoneNumber(payload.phoneNumber)
    );
    if (!isEmpty(existPhoneNumber)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Phone number already exist. Try another phone number",
      });
    }

    // check if role exist
    const existRole = await RoleService.getRoleById(payload.role);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Role does not exist. Try another role",
      });
    }

    // encrypt password
    formattedUser.password = await Encryption.encrypt(formattedUser.password);

    // format phone number for database
    formattedUser.phone_number = Utils.formatPhoneNumber(
      formattedUser.phone_number
    );

    const newUser = await UserService.createUser(formattedUser);
    if (isEmpty(newUser)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to create new user. Try again later.",
      });
    }

    const sanitizedResponse = UserUtils.sanitizeUser(newUser);

    return res
      .status(201)
      .json(
        this.successResponse(
          "User account created successfully",
          sanitizedResponse,
          201
        )
      );
  };

  /**
   * @description Assign role to user
   *
   * @route /users/:user_id/roles/:role_id
   * @method PUT
   * @access Private
   *
   * @param {Request} req - The request object user details payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the created user details.
   * @throws {AppError} If the user email already exists.
   * @throws {AppError} If the user phone number already exists.
   * @throws {AppError} If the user role does not exists.
   * @throws {AppError} If error occurred during user creation.
   */
  static assignRoleToUser = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const roleId: string = req.params.role_id;
    const userId: string = req.params.user_id;

    const existUser = await UserService.getUserById(userId);
    if (isEmpty(existUser)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User details not found",
      });
    }

    const existRole = await RoleService.getRoleById(roleId);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Role details not found",
      });
    }

    const updatedUser = await UserService.updateUserRole(userId, roleId);
    if (isEmpty(updatedUser)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to assign role to user. Try again later",
      });
    }

    return res
      .status(200)
      .json(
        this.successResponse(
          "Role assigned to user successfully",
          UserUtils.sanitizeUser(updatedUser)
        )
      );
  };
}

export default UserController;
