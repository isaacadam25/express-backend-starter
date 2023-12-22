// import required types
import { IUser } from "@/models/user/types";

class AuthUtils {
  /**
   * @description Sanitize response to human readable format
   *
   * @param {IUser} user - The user data from the payload.
   * @param {string} token - The user token.
   * @returns {any} The formatted response data to human readable format.
   */
  static sanitizeResponse = (user: IUser, token: string): object => {
    const userResponse = {
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      gender: user.gender,
      email: user.email,
      phoneNumber: user.phone_number,
      last_login: user.last_login,
      role: user.role.role_name,
      permissions: user.role.permissions.map((permission) => {
        return {
          id: permission._id,
          genericName: permission.generic_name,
          displayName: permission.display_name,
          description: permission.description,
        };
      }),
      token,
    };

    return userResponse;
  };
}

export default AuthUtils;
