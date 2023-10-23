import Joi from "joi";

class VolunteerValidation {
  /**
   *
   * @description Validate volunteer registration details
   *
   */
  static validateRegistration = () => {
    return Joi.object({
      firstName: Joi.string().max(50).required(),
      lastName: Joi.string().max(50).required(),
      gender: Joi.string().max(6).valid("male", "female").required(),
      phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required(),
      email: Joi.string().email().allow("", null),
    });
  };
}

export default VolunteerValidation;
