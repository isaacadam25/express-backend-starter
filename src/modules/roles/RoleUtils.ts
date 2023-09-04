import { IRole } from "@/models/role/types";
import { IRoleBody, IRolePayload } from "@/modules/roles/types";
import { map } from "lodash";

class RoleUtils {
  // format role to database query format
  static formatRole = (role: IRolePayload): IRoleBody => {
    const formattedRole: IRoleBody = {
      role_name: role.roleName,
      description: role.description,
      permissions: role.permissions,
    };

    return formattedRole;
  };

  // sanitize role to human readable format
  static sanitizeRole = (role: IRole): any => {
    return {
      id: role._id,
      roleName: role.role_name,
      description: role.description,
      permisssions: map(role.permissions, (permission) => {
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
