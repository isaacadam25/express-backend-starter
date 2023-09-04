import { Schema, model } from "mongoose";
import { IPermission } from "@/models/permission/types";

const permissionSchema: Schema = new Schema<IPermission>(
  {
    generic_name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    display_name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Permission = model<IPermission>("Permission", permissionSchema);

export default Permission;
