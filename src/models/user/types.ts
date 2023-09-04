import { Document } from "mongoose";
import { IRole } from "../role/types";

export interface IUser extends Document {
  username: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email?: string;
  password: string;
  last_login?: string;
  status?: boolean;
  role: IRole;
}
