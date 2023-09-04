import Joi from "joi";

class UserValidation {
  // validation schema for user registration details
  static validateRegistration = () => {
    return Joi.object({
      username: Joi.string().max(30).required(),
      firstName: Joi.string().max(50).required(),
      lastName: Joi.string().max(50).required(),
      gender: Joi.string().max(6).valid("male", "female").required(),
      phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().max(16).min(6).required(),
      role: Joi.string().max(24).min(24).required(),
    });
  };

  // validation schema for assigning user role
  static validateAssignRole = () => {
    return Joi.object({
      user_id: Joi.string().length(24).required(),
      role_id: Joi.string().length(24).required(),
    });
  };
}

export default UserValidation;
