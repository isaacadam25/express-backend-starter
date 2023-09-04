import Joi from "joi";

class PermissionValidation {
  // validate permisssion details schema
  static validatePermissionDetails = () => {
    return Joi.object({
      genericName: Joi.string().max(50).required(),
      displayName: Joi.string().max(50).required(),
      description: Joi.string().max(500).required(),
    });
  };
}

export default PermissionValidation;
