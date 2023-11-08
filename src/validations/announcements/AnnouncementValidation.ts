import Joi from "joi";

class AnnouncementValidation {
  /**
   *
   * @description Validate announcement details on send
   *
   */
  static validateDetails = () => {
    return Joi.object({
      title: Joi.string().max(50).required(),
      message: Joi.string().max(320).required(),
      receivers: Joi.array()
        .min(1)
        .required()
        .items(Joi.string().length(10).required()),
    });
  };
}

export default AnnouncementValidation;
