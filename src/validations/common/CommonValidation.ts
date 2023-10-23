import Joi from "joi";

class CommonValidation {
  /**
   *
   * @description Validate mongodb objectId
   *
   */
  static validateObjectId = () => {
    return Joi.object({
      id: Joi.string().max(24).min(24).required(),
    });
  };

  /**
   *
   * @description Validate volunteer objectId
   *
   */
  static validateVolunteerId = () => {
    return Joi.object({
      volunteer_id: Joi.string().max(24).min(24).required(),
    });
  };
}

export default CommonValidation;
