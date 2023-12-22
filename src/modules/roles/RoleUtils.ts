import { map } from "lodash";

// import required types
import { IRole } from "@/models/role/types";
import { IRoleBody, IRolePayload } from "@/modules/roles/types";

class RoleUtils {
  /**
   * @description Format role to database format
   *
   * @param {IRolePayload} payload - The role data from the payload.
   * @returns {IRoleBody} The formatted role data for saving to database.
   */
  static formatRole = (payload: IRolePayload): IRoleBody => {
    const formattedRole: IRoleBody = {
      role_name: payload.roleName,
      description: payload.description,
      permissions: payload.permissions,
    };

    return formattedRole;
  };

  /**
   * @description Sanitize role to human readable format
   *
   * @param {IRolePayload} payload - The role data from the payload.
   * @returns {IRoleBody} The formatted role data for saving to human readable format.
   */
  static sanitizeRole = (payload: IRole): any => {
    return {
      id: payload._id,
      roleName: payload.role_name,
      description: payload.description,
      permisssions: map(payload.permissions, (permission) => {
        return {
          id: permission._id,
          genericName: permission.generic_name,
          displayName: permission.display_name,
        };
      }),
    };
  };
}

export default RoleUtils;
