import { Schema, model } from "mongoose";
import { IUser } from "@/models/user/types";
import Encryption from "@/utils/helpers/Encryption";

const userSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  first_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: false,
    default: null,
  },
  last_login: {
    type: String,
    trim: true,
    required: false,
    default: null,
  },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Role",
    trim: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
