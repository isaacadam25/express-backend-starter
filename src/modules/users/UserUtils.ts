import { IUser } from "@/models/user/types";
import { IUserBody, IUserPayload } from "@/modules/users/types";
import { map } from "lodash";

class UserUtils {
  /**
   * Format user data from payload format to a database query format.
   * @param {IUserPayload} user - The user data from the payload.
   * @returns {IUserBody} The sanitized user data.
   */
  static formatUser = (user: IUserPayload): IUserBody => {
    const formmatedUser: IUserBody = {
      first_name: user.firstName,
      last_name: user.lastName,
      gender: user.gender,
      phone_number: user.phoneNumber,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    return formmatedUser;
  };

  /**
   * Sanitize user data from payload format to a user readable format
   * @param {IUserPayload} user - The user data from the payload.
   * @returns {IUserBody} The sanitized user data.
   */
  static sanitizeUser = (user: IUser) => {
    const sanitizedUser = {
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      gender: user.gender,
      phoneNumber: user.phone_number,
      email: user.email,
      last_login: user.last_login,
      role: user.role.role_name,
      permissions: map(user.role.permissions, (permission) => {
        return {
          id: permission._id,
          genericName: permission.generic_name,
          displayName: permission.display_name,
        };
      }),
    };

    return sanitizedUser;
  };
}

export default UserUtils;
