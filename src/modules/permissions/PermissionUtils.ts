// import required types
import { IPermission } from "@/models/permission/types";
import {
  IPermissionBody,
  IPermissionPayload,
} from "@/modules/permissions/types";

class PermisssionUtils {
  /**
   * @description Format permission details for database query
   *
   * @param {IPermissionPayload} permission - The permission generic name
   * @returns {IPermissionBody} A permission body to be saved to database
   */
  static formatPermission = (
    permission: IPermissionPayload
  ): IPermissionBody => {
    const formattedPermisssion: IPermissionBody = {
      generic_name: permission.genericName,
      display_name: permission.displayName,
      description: permission.description,
    };

    return formattedPermisssion;
  };

  /**
   * @description Sanitize permission details into user readable format
   *
   * @param {IPermission} permission - The permission generic name
   * @returns {IPermissionPayload} A permission response to be sent to user
   */
  static sanitizePermission = (permission: IPermission): IPermissionPayload => {
    const formattedPermisssion: IPermissionPayload = {
      id: permission._id,
      genericName: permission.generic_name,
      displayName: permission.display_name,
      description: permission.description,
    };

    return formattedPermisssion;
  };
}

export default PermisssionUtils;
