import { IPermission } from "@/models/permission/types";

export interface IRoleBody {
  role_name: string;
  description: string;
  permissions: string[];
}
export interface IRoleUpdate {
  roleName: string;
  description: string;
}

export interface IRolePayload {
  roleName: string;
  description: string;
  permissions: string[];
}

export interface IRoleResponse {
  roleName: string;
  description: string;
  permissions: IPermission[];
}

export interface IAddPermission {
  permissions: string[];
}

export interface IRemovePermission {
  permissions: string[];
}
