import { Request, Response } from "express";

// import required services
import PermissionService from "@/modules/permissions/PermissionSevice";

// import required helpers functions
import Controller from "@/modules/Controller";
import PermisssionUtils from "@/modules/permissions/PermissionUtils";
import { IPermissionPayload } from "./types";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

class PermisssionController extends Controller {
  // create new permisssion
  static createPermisssion = async (req: Request, res: Response) => {
    const payload: IPermissionPayload = req.body;

    const formattedPermisssion = PermisssionUtils.formatPermission(payload);

    const existGenericName = await PermissionService.getByGenericName(
      formattedPermisssion.generic_name
    );
    if (existGenericName) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description:
          "Permisssion generic name already exist. Please try another name",
      });
    }

    const existDisplayName = await PermissionService.getByDisplayName(
      payload.displayName
    );
    if (existDisplayName) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Display name already exist. Please try another name",
      });
    }

    const newPermission = await PermissionService.createPersmission(
      formattedPermisssion
    );
    if (!newPermission) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to create new permission. Try again leter",
      });
    }

    const response = PermisssionUtils.sanitizePermission(newPermission);

    return res
      .status(201)
      .json(
        this.successResponse(
          "New permission created successfully",
          response,
          201
        )
      );
  };

  // get all permissions
  static getAllPermissions = async (req: Request, res: Response) => {
    const permissions = await PermissionService.getAllPermissions();
    if (!permissions) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "No permission found at the moment",
      });
    }

    const response: IPermissionPayload[] = [];
    for (const permission of permissions) {
      response.push(PermisssionUtils.sanitizePermission(permission));
    }

    return res.json(
      this.successResponse(
        `${permissions.length} permissions retrieved successfully`,
        response
      )
    );
  };

  // retrieve single permission details
  static getSinglePermission = async (req: Request, res: Response) => {
    const permissionId: string = req.params.id;

    const existPermisssion = await PermissionService.getPermissionById(
      permissionId
    );
    if (!existPermisssion) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Permission details not found.",
      });
    }

    const response = PermisssionUtils.sanitizePermission(existPermisssion);

    return res.json(
      this.successResponse(
        "Permission details retrieved successfully",
        response
      )
    );
  };
}

export default PermisssionController;
