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
import { IUserPayload } from "@/modules/users/types";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

class UserController extends Controller {
  /**
   * Create a new user account.
   *
   * @route POST /users
   * @access Private
   *
   * @param {Request} req - The request object containing user payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the status of the user creation.
   * @throws {AppError} If the username already exists or user creation fails.
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
        description: "Role does not already exist. Try another role",
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
   * Assign role to user
   *
   * @route PUT /users/:user_id/roles/:role_id
   * @access Private
   *
   * @param {Request} req - The request object containing user params.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the status of the user role assignment.
   * @throws {AppError} If the user details not found
   * @throws {AppError} If the role details not found
   */
  static assignRoleToUser = async (req: Request, res: Response) => {
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
