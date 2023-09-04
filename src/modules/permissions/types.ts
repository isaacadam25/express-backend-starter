export interface IPermissionBody {
  generic_name: string;
  display_name: string;
  description: string;
}

export interface IPermissionPayload {
  id?: string;
  genericName: string;
  displayName: string;
  description: string;
}
