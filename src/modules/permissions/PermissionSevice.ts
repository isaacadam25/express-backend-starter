import PermissionRepository from "@/modules/permissions/PermissionRepository";
import { IPermission } from "@/models/permission/types";
import { IPermissionBody } from "@/modules/permissions/types";

class PermissionService extends PermissionRepository {
  // create new permission
  static createPersmission = (
    payload: IPermissionBody
  ): Promise<IPermission | null> => {
    return this.create(payload);
  };

  // get permission by generic name
  static getByGenericName = (
    genericName: string
  ): Promise<IPermission | null> => {
    return this.getOneByQuery({ generic_name: genericName });
  };

  // get permission by display name
  static getByDisplayName = (
    displayName: string
  ): Promise<IPermission | null> => {
    return this.getOneByQuery({ display_name: displayName });
  };

  // get permission by its coresponding id
  static getPermissionById = (id: string): Promise<IPermission | null> => {
    return this.getById(id);
  };

  // retrieve all permissions from database
  static getAllPermissions = (): Promise<IPermission[] | null> => {
    return this.getAll();
  };
}

export default PermissionService;
