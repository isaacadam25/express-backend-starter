import Joi from "joi";

class CommonValidation {
  // validate mongo db id
  static validateObjectId = () => {
    return Joi.object({
      id: Joi.string().max(24).min(24).required(),
    });
  };
}

export default CommonValidation;
