import User from "@/models/user/User";
import { IUserBody } from "@/modules/users/types";
import { IUser } from "@/models/user/types";

class UserRepository {
  /**
   * Create a new user.
   * @param {IUserPayload} payload - The data for creating a new user.
   * @returns {Promise<IUser | null>} A promise that resolves to the created user or null.
   */
  protected static create = (payload: IUserBody): Promise<IUser | null> => {
    return User.create(payload);
  };

  /**
   * Get all users.
   * @returns {Promise<IUser[] | null >} A promise that resolves to an array of users | null.
   */
  protected static getAll = (): Promise<IUser[] | null> => {
    return User.find();
  };

  /**
   * Get a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  protected static getById = (id: string): Promise<IUser | null> => {
    return User.findById(id).populate({
      path: "role",
      populate: [{ path: "permissions" }],
    });
  };

  /**
   * Get users based on a custom query.
   * @param {object} query - The custom query to search for users.
   * @returns {Promise<IUser[] | null>} A promise that resolves to an array of users matching the query | null.
   */
  protected static getByQuery = (query: object): Promise<IUser[] | null> => {
    return User.find(query);
  };

  /**
   * Get a user based on a custom query.
   * @param {object} query - The custom query to search for a user.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  protected static getOneByQuery = (query: object): Promise<IUser | null> => {
    return User.findOne(query).populate({
      path: "role",
      populate: [{ path: "permissions" }],
    });
  };

  /**
   * Get users based on a custom query with pagination.
   * @param {object} query - The custom query to search for users.
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The number of users to retrieve per page.
   * @returns {Promise<IUser[] | null>} A promise that resolves to an array of users matching the query.
   */
  protected static getByQueryWithPagination = (
    query: object,
    page: number,
    limit: number
  ): Promise<IUser[] | null> => {
    return User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
  };

  /**
   * Update users based on a their ID.
   * @param {object} query - The custom query to find users to update.
   * @param {object} updateData - The data to update the users with.
   * @returns {Promise<IUser | null>} A promise that resolves to an array of updated users.
   */
  protected static updateById = (
    id: string,
    updateData: object
  ): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      timestamps: true,
    }).populate({
      path: "role",
      populate: [{ path: "permissions" }],
    });
  };

  /**
   * Delete a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<IUser | null>} A promise that resolves to the deleted user or null.
   */
  protected static deleteById = (id: string): Promise<IUser | null> => {
    return User.findByIdAndDelete(id);
  };
}

export default UserRepository;
