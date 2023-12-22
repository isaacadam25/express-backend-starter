// import required types
import { IVolunteer } from "@/models/volunteers/types";
import {
  IVolunteerBody,
  IVolunteerPayload,
  IVolunteerReponse,
} from "@/modules/volunteers/types";

class VolunteerUtils {
  /**
   * @description Format volunteer details to database format
   *
   * @param {IVolunteerPayload} payload - The volunteer data from the payload.
   * @returns {IVolunteerBody} The formatted volunteer data for saving to database.
   */
  static formatVolunteerDetails = (
    payload: IVolunteerPayload
  ): IVolunteerBody => {
    return {
      first_name: payload.firstName,
      last_name: payload.lastName,
      gender: payload.gender,
      phone_number: payload.phoneNumber,
      email: payload.email,
    };
  };

  /**
   * @description Sanitize volunteer details to human readable format
   *
   * @param {IVolunteer} payload - The volunteer data from the payload.
   * @returns {IVolunteerReponse} The sanitized volunteer data.
   */
  static sanitizeVoluteerDetails = (payload: IVolunteer): IVolunteerReponse => {
    return {
      id: payload._id,
      firstName: payload.first_name,
      lastName: payload.last_name,
      gender: payload.gender,
      phoneNumber: payload.phone_number,
      email: payload.email,
      status: payload.status,
    };
  };
}

export default VolunteerUtils;
