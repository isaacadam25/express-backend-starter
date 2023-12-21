// import required repositories
import PermissionRepository from "@/modules/permissions/PermissionRepository";

// import required types
import { IPermission } from "@/models/permission/types";
import { IPermissionBody } from "@/modules/permissions/types";

class PermissionService extends PermissionRepository {
  /**
   * @description Create new permission
   *
   * @param {string} payload - The permission details payload
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  static createPersmission = (
    payload: IPermissionBody
  ): Promise<IPermission | null> => {
    return this.create(payload);
  };

  /**
   * @description Get permission by generic name
   *
   * @param {string} genericName - The permission generic name
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  static getByGenericName = (
    genericName: string
  ): Promise<IPermission | null> => {
    return this.getOneByQuery({ generic_name: genericName });
  };

  /**
   * @description Get permission by display name
   *
   * @param {string} displayName - The permission display name
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  static getByDisplayName = (
    displayName: string
  ): Promise<IPermission | null> => {
    return this.getOneByQuery({ display_name: displayName });
  };

  /**
   * @description Get permission by its corresponding id
   *
   * @param {string} id - The permission ID
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  static getPermissionById = (id: string): Promise<IPermission | null> => {
    return this.getById(id);
  };

  /**
   * @description Retrieve all permissions from database
   *
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  static getAllPermissions = (): Promise<IPermission[] | null> => {
    return this.getAll();
  };
}

export default PermissionService;
