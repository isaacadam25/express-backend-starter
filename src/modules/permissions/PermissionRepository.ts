import Permission from "@/models/permission/Permission";
import { IPermissionBody } from "@/modules/permissions/types";
import { IPermission } from "@/models/permission/types";

class PermissionRepository {
  /**
   * @description Create a new permission.
   * @param {IPermissionBody} payload - The data for creating a new permission.
   * @returns {Promise<IPermission | null>} A promise that resolves to the created permission or null.
   */
  protected static create = (
    payload: IPermissionBody
  ): Promise<IPermission | null> => {
    return Permission.create(payload);
  };

  /**
   * @description Get all available permissions
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  protected static getAll = (): Promise<IPermission[] | null> => {
    return Permission.find();
  };

  /**
   * @description Get all available permission with respect to query passed
   * @param {object} query - The query condition
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permissions or null.
   */
  protected static getByQuery = (
    query: object
  ): Promise<IPermission[] | null> => {
    return Permission.find(query);
  };

  /**
   * @description Get single permission by ID
   * @param {string} id - The ID of the permission
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  protected static getById = (id: string): Promise<IPermission | null> => {
    return Permission.findById(id);
  };

  /**
   * @description Get single permission by query passed
   * @param {object} query - The query condition
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  protected static getOneByQuery = (
    query: object
  ): Promise<IPermission | null> => {
    return Permission.findOne(query);
  };

  /**
   * @description Update single permission details by id
   * @param {string} id - The ID of the permission
   * @param {IPermissionBody} payload - The data for updating a permission.
   * @returns {Promise<IPermission | null>} A promise that resolves to the updated permission or null.
   */
  protected static updateById = (
    id: string,
    payload: IPermissionBody
  ): Promise<IPermission | null> => {
    return Permission.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      timestamps: true,
    });
  };

  /**
   * @description Delete single permission by id
   * @param {string} id - The ID of the permission
   * @returns {Promise<IPermission | null>} A promise that resolves to the retrieved permission or null.
   */
  protected static deleteById = (id: string): Promise<IPermission | null> => {
    return Permission.findByIdAndDelete(id);
  };
}

export default PermissionRepository;
