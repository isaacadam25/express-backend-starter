import RoleRepository from "@/modules/roles/RoleRepository";
import Utils from "@/utils/helpers/Utils";
import { IRole } from "@/models/role/types";
import { IRoleBody, IRoleUpdate } from "@/modules/roles/types";

class RoleService extends RoleRepository {
  // get role by name
  static getRoleByName = (roleName: string): Promise<IRole | null> => {
    return this.getOneByQuery({
      role_name: { $regex: Utils.caseInsensitiveRegex(roleName) },
    });
  };

  // create new role
  static createRole = async (payload: IRoleBody): Promise<IRole | null> => {
    const newRole = await this.create(payload);

    const createdRole = await this.getById(newRole._id);

    return createdRole;
  };

  // get role by its corresponding id
  static getRoleById = (roleId: string): Promise<IRole | null> => {
    return this.getById(roleId);
  };

  // add permissions to a role
  static addPermissionToRole = (
    roleId: string,
    permissionId: string
  ): Promise<IRole | null> => {
    return this.updateById(roleId, {
      $addToSet: { permissions: permissionId },
    });
  };

  // remove permissions to a role
  static removePermissionFromRole = (
    roleId: string,
    permissionId: string
  ): Promise<IRole | null> => {
    return this.updateById(roleId, {
      $pull: { permissions: permissionId },
    });
  };

  // retrieve all roles
  static getAllRoles = (): Promise<IRole[] | null> => {
    return this.getAll();
  };

  // delete role
  static deleteRole = (roleId: string): Promise<IRole | null> => {
    return this.deleteById(roleId);
  };

  // update role details
  static updateRole = (
    id: string,
    payload: IRoleUpdate
  ): Promise<IRole | null> => {
    return this.updateById(id, {
      role_name: payload.roleName,
      description: payload.description,
    });
  };
}

export default RoleService;
