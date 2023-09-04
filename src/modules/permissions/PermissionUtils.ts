import { IPermission } from "@/models/permission/types";
import {
  IPermissionBody,
  IPermissionPayload,
} from "@/modules/permissions/types";

class PermisssionUtils {
  // format permission details for data base query
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

  // sanitize permission details into user readable format
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
