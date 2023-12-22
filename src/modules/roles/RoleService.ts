// import required repository
import RoleRepository from "@/modules/roles/RoleRepository";

// import required helper utils
import Utils from "@/utils/helpers/Utils";

// import required types
import { IRole } from "@/models/role/types";
import { IRoleBody, IRoleUpdate } from "@/modules/roles/types";

class RoleService extends RoleRepository {
  /**
   * @description Create new role
   *
   * @param {IRoleBody} payload - The role details
   * @returns {Promise<IRole | null>} A promise that resolves to the created role or null.
   */
  static createRole = async (payload: IRoleBody): Promise<IRole | null> => {
    const newRole = await this.create(payload);

    const createdRole = await this.getById(newRole._id);

    return createdRole;
  };

  /**
   * @description Get role by name
   *
   * @param {string} roleName - The role name
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved role or null.
   */
  static getRoleByName = (roleName: string): Promise<IRole | null> => {
    return this.getOneByQuery({
      role_name: { $regex: Utils.caseInsensitiveRegex(roleName) },
    });
  };

  /**
   * @description Get single role by ID
   *
   * @param {string} roleId - The role ID
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved role or null.
   */
  static getRoleById = (roleId: string): Promise<IRole | null> => {
    return this.getById(roleId);
  };

  /**
   * @description Add permissions to a role
   *
   * @param {string} roleId - The role ID
   * @param {string} permissionId - The permission ID
   * @returns {Promise<IRole | null>} A promise that resolves to the updated role or null.
   */
  static addPermissionToRole = (
    roleId: string,
    permissionId: string
  ): Promise<IRole | null> => {
    return this.updateById(roleId, {
      $addToSet: { permissions: permissionId },
    });
  };

  /**
   * @description Remove permissions from a role
   *
   * @param {string} roleId - The role ID
   * @param {string} permissionId - The permission ID
   * @returns {Promise<IRole | null>} A promise that resolves to the updated role or null.
   */
  static removePermissionFromRole = (
    roleId: string,
    permissionId: string
  ): Promise<IRole | null> => {
    return this.updateById(roleId, {
      $pull: { permissions: permissionId },
    });
  };

  /**
   * @description Retrieve all roles
   *
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved roles or null.
   */
  static getAllRoles = (): Promise<IRole[] | null> => {
    return this.getAll();
  };

  /**
   * @description Delete single role by ID
   *
   * @param {string} roleId - The role ID
   * @returns {Promise<IRole | null>} A promise that resolves to the deleted role or null.
   */
  static deleteRole = (roleId: string): Promise<IRole | null> => {
    return this.deleteById(roleId);
  };

  /**
   * @description Update role details by ID
   *
   * @param {string} roleId - The role ID
   * @param {IRoleUpdate} payload - The role payload update
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved role or null.
   */
  static updateRole = (
    roleId: string,
    payload: IRoleUpdate
  ): Promise<IRole | null> => {
    return this.updateById(roleId, {
      role_name: payload.roleName,
      description: payload.description,
    });
  };
}

export default RoleService;
