import Joi from "joi";

class RoleValidation {
  // validate role details on create
  static validateRoleDetails = () => {
    return Joi.object({
      roleName: Joi.string().max(50).required(),
      description: Joi.string().max(400).required(),
      permissions: Joi.array()
        .items(Joi.string().max(24).min(24))
        .min(1)
        .max(20)
        .required(),
    });
  };

  // validate role details on update
  static validateRoleUpdate = () => {
    return Joi.object({
      roleName: Joi.string().max(50).required(),
      description: Joi.string().max(400).required(),
    });
  };

  // validate permission details on add to role
  static validateAddPermissionRole = () => {
    return Joi.object({
      permissions: Joi.array()
        .min(1)
        .max(16)
        .items(Joi.string().max(24).min(24))
        .required(),
    });
  };

  // validate permission details on remove from role
  static validateRemovePermissionRole = () => {
    return Joi.object({
      permissions: Joi.array()
        .min(1)
        .max(16)
        .items(Joi.string().max(24).min(24))
        .required(),
    });
  };
}

export default RoleValidation;
