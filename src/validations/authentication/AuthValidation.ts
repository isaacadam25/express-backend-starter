import Joi from "joi";

class AuthValidation {
  // validation schema for user login details
  static validateLogin = () => {
    return Joi.object({
      phoneNumber: Joi.string().length(10).required(),
      password: Joi.string().max(16).min(6).required(),
    });
  };

  // validation schema for changing user password
  static validateChangePassword = () => {
    return Joi.object({
      password: Joi.string().max(16).min(6).required(),
      new_password: Joi.string().max(16).min(6).required(),
      confirm_password: Joi.string().max(16).min(6).required(),
    });
  };
}

export default AuthValidation;
