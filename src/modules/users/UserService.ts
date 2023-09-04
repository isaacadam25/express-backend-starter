import UserRepository from "@/modules/users/UserRepository";
import Utils from "@/utils/helpers/Utils";
import { IUser } from "@/models/user/types";
import { IUserBody } from "@/modules/users/types";

class UserService extends UserRepository {
  /**
   * Get a user by their username.
   * @param {string} username - The username of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserByUsername = (username: string): Promise<IUser | null> => {
    return this.getOneByQuery({
      username: { $regex: Utils.caseInsensitiveRegex(username) },
    });
  };

  /**
   * Get a user by their email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserByEmail = (email: string): Promise<IUser | null> => {
    return this.getOneByQuery({
      email: { $regex: Utils.caseInsensitiveRegex(email) },
    });
  };

  /**
   * Get a user by their phone number.
   * @param {string} phoneNumber - The phone number of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserByPhoneNumber = (
    phoneNumber: string
  ): Promise<IUser | null> => {
    return this.getOneByQuery({
      phone_number: { $regex: Utils.caseInsensitiveRegex(phoneNumber) },
    });
  };

  /**
   * Register new user
   * @param {IUserBody} payload - The user details object.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static createUser = async (payload: IUserBody): Promise<IUser | null> => {
    const newUser = await this.create(payload);

    const createdUser = await this.getById(newUser._id);

    return createdUser;
  };

  /**
   * Get single user by their ID
   * @param {string} userId - The user details object.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserById = (userId: string): Promise<IUser | null> => {
    return this.getById(userId);
  };

  /**
   * Get user with respect to role id
   * @param {string} roleId - The role ID
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUsersByRole = (roleId: string): Promise<IUser[] | null> => {
    return this.getByQuery({ role: roleId });
  };

  // update user role
  static updateUserRole = (
    userId: string,
    roleId: string
  ): Promise<IUser | null> => {
    return this.updateById(userId, { role: roleId });
  };

  static updateUserPassword = (
    userId: string,
    password: string
  ): Promise<IUser | null> => {
    return this.updateById(userId, { password: password });
  };
}

export default UserService;
