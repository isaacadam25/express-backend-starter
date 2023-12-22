import Role from "@/models/role/Role";
import { IRole } from "@/models/role/types";
import { IRoleBody } from "@/modules/roles/types";

class RoleRepository {
  /**
   * @description Create new role query
   * @param {IRoleBody} payload - The data for creating a new role.
   * @returns {Promise<IRole | null>} A promise that resolves to the created role or null.
   */
  protected static create = (payload: IRoleBody): Promise<IRole | null> => {
    return Role.create(payload);
  };

  /**
   * @description Retrieve all available roles query
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved roles or null.
   */
  protected static getAll = (): Promise<IRole[] | null> => {
    return Role.find().populate({
      path: "permissions",
      select: "_id generic_name display_name",
    });
  };

  /**
   * @description Retrieve single role by id query
   * @param {string} id - The role ID
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved role or null.
   */
  protected static getById = (id: string): Promise<IRole | null> => {
    return Role.findById(id).populate({
      path: "permissions",
      select: "_id generic_name display_name",
    });
  };

  /**
   * @description Retrieve single role by query
   * @param {object} query - The query condition
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved role or null.
   */
  protected static getOneByQuery = (query: object): Promise<IRole | null> => {
    return Role.findOne(query);
  };

  /**
   * @description Retrieve all available roleS with respect to query passed
   * @param {object} query - The query condition
   * @returns {Promise<IRole | null>} A promise that resolves to the retrieved roles or null.
   */
  protected static getByQuery = (query: object): Promise<IRole[] | null> => {
    return Role.find(query);
  };

  /**
   * @description Update role details by id
   * @param {string} id - The role ID
   * @param {object} payload - The query condition
   * @returns {Promise<IRole | null>} A promise that resolves to the updated roles or null.
   */
  protected static updateById = (
    id: string,
    payload: object
  ): Promise<IRole | null> => {
    return Role.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      timestamps: true,
    }).populate({
      path: "permissions",
      select: "_id generic_name display_name",
    });
  };

  /**
   * @description Delete single role by id
   * @param {string} id - The role ID
   * @returns {Promise<IRole | null>} A promise that resolves to the deleted role or null.
   */
  protected static deleteById = (id: string): Promise<IRole | null> => {
    return Role.findByIdAndDelete(id);
  };
}

export default RoleRepository;
