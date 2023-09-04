import UserRepository from "@/modules/users/UserRepository";
import { IUser } from "@/models/user/types";

class AuthService extends UserRepository {
  // get user details with respect to phone number
  static getUserByPhoneNumber = (
    phoneNumber: string
  ): Promise<IUser | null> => {
    return this.getOneByQuery({ phone_number: phoneNumber });
  };
}

export default AuthService;
