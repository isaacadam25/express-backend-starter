import UserRepository from "@/modules/users/UserRepository";
import { IUser } from "@/models/user/types";

class AuthService extends UserRepository {
  /**
   * @description Get a user by their phone number
   *
   * @param {string} phoneNumber - The phone number of the user to retrieve.
   * @returns {Promise<IUser | null>} A promise that resolves to the retrieved user or null.
   */
  static getUserByPhoneNumber = (
    phoneNumber: string
  ): Promise<IUser | null> => {
    return this.getOneByQuery({ phone_number: phoneNumber });
  };
}

export default AuthService;
