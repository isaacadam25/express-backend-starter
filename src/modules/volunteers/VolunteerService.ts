// import required repository
import VolunteerRepository from "@/modules/volunteers/VolunteerRepository";

// import required types
import { IVolunteerBody } from "@/modules/volunteers/types";
import { IVolunteer } from "@/models/volunteers/types";

class VolunteerService extends VolunteerRepository {
  /**
   * @description Create new volunteer details
   *
   * @param {IVolunteerBody} payload - The volunteer details payload
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the retrieved volunteer or null.
   */
  static saveVolunteerDetails = async (
    payload: IVolunteerBody
  ): Promise<IVolunteer | null> => {
    const savedVolunteer = await this.create(payload);

    return this.getById(savedVolunteer._id);
  };

  /**
   * @description Get single volunteer details by their phone number
   *
   * @param {string} phoneNumber - The volunteer phone number
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the retrieved volunteer or null.
   */
  static getVolunteerByPhoneNumber = (
    phoneNumber: string
  ): Promise<IVolunteer | null> => {
    return this.getOneByQuery({ phone_number: phoneNumber });
  };

  /**
   * @description Get single volunteer details by their email address
   *
   * @param {string} email - The volunteer email
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the retrieved volunteer or null.
   */
  static getVolunteerByEmail = (email: string): Promise<IVolunteer | null> => {
    return this.getOneByQuery({ email: email });
  };

  /**
   * @description Get single volunteer details
   *
   * @param {string} volunteerId - The volunteer ID
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the retrieved volunteer or null.
   */
  static getVolunteerDetails = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return this.getById(volunteerId);
  };

  /**
   * @description Update single volunteer details
   *
   * @param {string} volunteerId - The volunteer ID
   * @param {object} payload - The volunteer details
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the updated volunteer or null.
   */
  static editVolunteerDetails = (
    volunteerId: string,
    payload: object
  ): Promise<IVolunteer | null> => {
    return this.updateById(volunteerId, payload);
  };

  /**
   * @description Get all volunteers
   *
   * @param {object} query - The query condition to retrieve volunteers
   * @param {number} skip - The page to retrieve
   * @param {number} limit - The page to retrieve
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the retrieved volunteers or null.
   */
  static getVolunteers = (
    query: object,
    skip: number,
    limit: number
  ): Promise<IVolunteer[] | null> => {
    return this.getByQuery(query, skip, limit);
  };

  /**
   * @description Delete single volunteer details
   *
   * @param {string} volunteerId - The volunteer ID
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the deleted volunteer or null.
   */
  static deleteVolunteerDetails = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return this.deleteById(volunteerId);
  };
}

export default VolunteerService;
