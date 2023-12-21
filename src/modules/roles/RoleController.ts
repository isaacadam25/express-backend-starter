import { Request, Response } from "express";
import { isEmpty, size } from "lodash";

// import required services
import RoleService from "@/modules/roles/RoleService";
import PermissionService from "@/modules/permissions/PermissionSevice";
import UserService from "../users/UserService";

// import required helper functions
import Controller from "@/modules/Controller";
import RoleUtils from "@/modules/roles/RoleUtils";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

// import required types
import { IRole } from "@/models/role/types";
import {
  IAddPermission,
  IRemovePermission,
  IRolePayload,
  IRoleUpdate,
} from "@/modules/roles/types";

class RoleController extends Controller {
  /**
   * @description Create new role
   *
   * @route /roles
   * @method POST
   * @access private
   *
   * @param {Request} req - The request object role details payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the created role details.
   * @throws {AppError} If the role name already exists.
   * @throws {AppError} If error occurred during role creation
   */
  static createRole = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const rolePayload: IRolePayload = req.body;

    const existRole = await RoleService.getRoleByName(rolePayload.roleName);
    if (!isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Role name already exist. Please try another name",
      });
    }

    const formattedRole = RoleUtils.formatRole(rolePayload);

    const newRole = await RoleService.createRole(formattedRole);
    if (isEmpty(newRole)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to create new role. Try again later.",
      });
    }

    const response = RoleUtils.sanitizeRole(newRole);

    return res
      .status(201)
      .json(
        this.successResponse("New role created successfully", response, 201)
      );
  };

  /**
   * @description Add permission to role
   *
   * @route /roles/permissions/:id
   * @method PUT
   * @access private
   *
   * @param {Request} req - The request object role details payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the created role details.
   * @throws {AppError} If the role does not exists.
   * @throws {AppError} If the permission in role already exists.
   * @throws {AppError} If error occurred during add role to permission.
   */
  static addPermissionToRole = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const payload: IAddPermission = req.body;
    const roleId: string = req.params.id;

    const existRole = await RoleService.getRoleById(roleId);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Role details not found",
      });
    }

    // check if permission exist in selected role
    const { permissions } = existRole;
    const permissionExist = permissions.some((permission) =>
      payload.permissions.some((item) => item === permission._id.toString())
    );
    if (permissionExist) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description:
          "Some permission are already assigned. Please recheck again",
      });
    }

    // add permission to role
    for await (const permission of payload.permissions) {
      const addedPermission = await RoleService.addPermissionToRole(
        roleId,
        permission
      );
      if (isEmpty(addedPermission)) {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Failed to add permission to role. Try again later",
        });
      }
    }
    const updatedRole = await RoleService.getRoleById(roleId);

    return res
      .status(200)
      .json(
        this.successResponse(
          "Permissions added successfully",
          RoleUtils.sanitizeRole(updatedRole)
        )
      );
  };

  /**
   * @description Get all roles
   *
   * @route /roles
   * @method GET
   * @access private
   *
   * @param {Request} _req - The request object.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the retrieved roles.
   * @throws {AppError} If no role exists.
   */
  static getAllRoles = async (
    _req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const roles = await RoleService.getAllRoles();
    if (isEmpty(roles)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "No role found at the moment",
      });
    }

    const sanitizedRoles: IRole[] = [];
    for (const role of roles) {
      sanitizedRoles.push(RoleUtils.sanitizeRole(role));
    }
    return res
      .status(200)
      .json(
        this.successResponse(
          `${size(sanitizedRoles)} roles retrieved successfully`,
          sanitizedRoles
        )
      );
  };

  /**
   * @description Get single role by ID
   *
   * @route /roles/:id
   * @method GET
   * @access private
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the retrieved role details.
   * @throws {AppError} If role details does not exist.
   */
  static getSingleRole = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const roleId: string = req.params.id;

    const existRole = await RoleService.getRoleById(roleId);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Role details not found",
      });
    }

    return res
      .status(200)
      .json(
        this.successResponse(
          "Role details retrieved successfully",
          RoleUtils.sanitizeRole(existRole)
        )
      );
  };

  /**
   * @description Remove permissions from a role
   *
   * @route /roles/permissions/:id
   * @method DELETE
   * @access private
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the retrieved role details.
   * @throws {AppError} If role details does not exist.
   * @throws {AppError} If some role permission details does not exist.
   * @throws {AppError} If failed to remove role permission details.
   */
  static removePermissionFromRole = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const roleId: string = req.params.id;
    const payload: IRemovePermission = req.body;

    const existRole = await RoleService.getRoleById(roleId);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Role details not found",
      });
    }

    // check if permission exist
    for await (const permission of payload.permissions) {
      const permissionExist = await PermissionService.getPermissionById(
        permission
      );
      if (isEmpty(permissionExist)) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Some permissions are not found",
        });
      }
    }

    // check if permission exist in selected role
    const { permissions } = existRole;
    const permissionExist = permissions.some((permission) =>
      payload.permissions.some((item) => item === permission._id.toString())
    );
    if (!permissionExist) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description:
          "Some permission are not assigned to selected role. Please recheck again",
      });
    }

    // remove permissions from a role
    for await (const permission of payload.permissions) {
      const updatedRole = await RoleService.removePermissionFromRole(
        roleId,
        permission
      );
      if (isEmpty(updatedRole)) {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description:
            "Failed to remove permission from a role. Try again later",
        });
      }
    }

    const updatedRole = await RoleService.getRoleById(roleId);

    return res
      .status(200)
      .json(
        this.successResponse(
          "Permissions removed successfully",
          RoleUtils.sanitizeRole(updatedRole)
        )
      );
  };

  /**
   * @description Update role details
   *
   * @route /roles/:id
   * @method PUT
   * @access private
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the retrieved role details.
   * @throws {AppError} If role details does not exist.
   * @throws {AppError} If role name already exist.
   * @throws {AppError} If failed to update role details.
   */
  static updateRoleDetails = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const roleId: string = req.params.id;
    const payload: IRoleUpdate = req.body;

    const existRole = await RoleService.getRoleById(roleId);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Role details not found",
      });
    }

    const existRoleName = await RoleService.getRoleByName(payload.roleName);
    if (existRoleName && existRoleName._id.toString() !== roleId) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Role name already exist. Pleae try another name",
      });
    }

    // update role details
    const updatedRole = await RoleService.updateRole(roleId, payload);
    if (isEmpty(updatedRole)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to update role details. Try again later",
      });
    }

    return res
      .status(200)
      .json(
        this.successResponse(
          "Role details updated successfully",
          RoleUtils.sanitizeRole(updatedRole)
        )
      );
  };

  /**
   * @description Delete role details
   *
   * @route /roles/:id
   * @method DELETE
   * @access private
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the retrieved role details.
   * @throws {AppError} If role details does not exist.
   * @throws {AppError} If role have permissions.
   * @throws {AppError} If role has been assigned to user.
   * @throws {AppError} If failed to delete role details.
   */
  static deleteRole = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const roleId: string = req.params.id;

    const existRole = await RoleService.getRoleById(roleId);
    if (isEmpty(existRole)) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Role details not found",
      });
    }

    // check if role contains any permission before delete
    const { permissions } = existRole;
    if (!isEmpty(permissions)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Role that contains permission can not be deleted",
      });
    }

    // verify if a role is not assigned to any user before delete
    const roleAssigned = await UserService.getUsersByRole(roleId);
    if (!isEmpty(roleAssigned)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Role that is assigned to user can not be deleted",
      });
    }

    const deletedRole = await RoleService.deleteRole(roleId);
    if (isEmpty(deletedRole)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to delete role details. Try again later",
      });
    }

    return res
      .status(200)
      .json(this.successResponse("Role deleted successfully"));
  };
}

export default RoleController;
