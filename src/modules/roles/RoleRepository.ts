import Role from "@/models/role/Role";
import { IRole } from "@/models/role/types";
import { IRoleBody } from "@/modules/roles/types";

class RoleRepository {
  // create new role query
  protected static create = (payload: IRoleBody): Promise<IRole | null> => {
    return Role.create(payload);
  };

  // retrieve all available roles query
  protected static getAll = (): Promise<IRole[] | null> => {
    return Role.find().populate({
      path: "permissions",
      select: "_id generic_name display_name",
    });
  };

  // retrieve single role by id query
  protected static getById = (id: string): Promise<IRole | null> => {
    return Role.findById(id).populate({
      path: "permissions",
      select: "_id generic_name display_name",
    });
  };

  // retrieve single role by query
  protected static getOneByQuery = (query: object): Promise<IRole | null> => {
    return Role.findOne(query);
  };

  // retrieve all available role with respect to query passed
  protected static getByQuery = (query: object): Promise<IRole[] | null> => {
    return Role.find(query);
  };

  // update role details by id
  protected static updateById = (
    id: string,
    payload: object
  ): Promise<IRole | null> => {
    return Role.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      timestamps: true,
    }).populate({
      path: "permissions",
      select: "_id generic_name display_name",
    });
  };

  // delete single role by id
  protected static deleteById = (id: string): Promise<IRole | null> => {
    return Role.findByIdAndDelete(id);
  };
}

export default RoleRepository;
