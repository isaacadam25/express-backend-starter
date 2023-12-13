// import required data repositories
import UserRepository from "@/modules/users/UserRepository";

// import required helper utils
import Utils from "@/utils/helpers/Utils";

// import required types
import { IUser } from "@/models/user/types";
import { IUserBody } from "@/modules/users/types";

class UserService extends UserRepository {
  /**
   * @description Get a user by their username
   *
   * @param {string} username - The username of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserByUsername = (username: string): Promise<IUser | null> => {
    return this.getOneByQuery({
      username: { $regex: Utils.caseInsensitiveRegex(username) },
    });
  };

  /**
   * @description Get a user by their email
   *
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserByEmail = (email: string): Promise<IUser | null> => {
    return this.getOneByQuery({
      email: { $regex: Utils.caseInsensitiveRegex(email) },
    });
  };

  /**
   * @description Get a user by their phone number
   *
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
   * @description Register new user
   *
   * @param {IUserBody} payload - The user details object.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static createUser = async (payload: IUserBody): Promise<IUser | null> => {
    const newUser = await this.create(payload);

    const createdUser = await this.getById(newUser._id);

    return createdUser;
  };

  /**
   * @description Get single user by their ID
   *
   * @param {string} userId - The user details object.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserById = (userId: string): Promise<IUser | null> => {
    return this.getById(userId);
  };

  /**
   * @description Get user with respect to role id
   *
   * @param {string} roleId - The role ID
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUsersByRole = (roleId: string): Promise<IUser[] | null> => {
    return this.getByQuery({ role: roleId });
  };

  /**
   * @description Update user role
   *
   * @param {string} userId - The user ID
   * @param {string} roleId - The role ID
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static updateUserRole = (
    userId: string,
    roleId: string
  ): Promise<IUser | null> => {
    return this.updateById(userId, { role: roleId });
  };

  /**
   * @description Update user password
   *
   * @param {string} userId - The user ID
   * @param {string} password - New user password
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static updateUserPassword = (
    userId: string,
    password: string
  ): Promise<IUser | null> => {
    return this.updateById(userId, { password: password });
  };
}

export default UserService;
