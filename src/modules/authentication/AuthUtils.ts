import { IUser } from "@/models/user/types";

class AuthUtils {
  // sanitize response into human readable format
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
