import Permission from "@/models/permission/Permission";
import { IPermissionBody } from "@/modules/permissions/types";
import { IPermission } from "@/models/permission/types";

class PermissionRepository {
  // create new permission
  protected static create = (
    payload: IPermissionBody
  ): Promise<IPermission | null> => {
    return Permission.create(payload);
  };

  // get all available permissions
  protected static getAll = (): Promise<IPermission[] | null> => {
    return Permission.find();
  };

  // get all available permission with respect to query passed
  protected static getByQuery = (
    query: object
  ): Promise<IPermission[] | null> => {
    return Permission.find(query);
  };

  // get single permission by ID
  protected static getById = (id: string): Promise<IPermission | null> => {
    return Permission.findById(id);
  };

  // get single permission by query passed
  protected static getOneByQuery = (
    query: object
  ): Promise<IPermission | null> => {
    return Permission.findOne(query);
  };

  // update single permission details by id
  protected static updateById = (
    id: string,
    payload: IPermissionBody
  ): Promise<IPermission | null> => {
    return Permission.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      timestamps: true,
    });
  };

  // delete single permission by id
  protected static deleteById = (id: string): Promise<IPermission | null> => {
    return Permission.findByIdAndDelete(id);
  };
}

export default PermissionRepository;
