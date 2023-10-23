import VolunteerRepository from "@/modules/volunteers/VolunteerRepository";
import { IVolunteerBody } from "@/modules/volunteers/types";
import { IVolunteer } from "@/models/volunteers/types";

class VolunteerService extends VolunteerRepository {
  /**
   *
   * @description Create new volunteer details
   *
   */
  static saveVolunteerDetails = async (
    payload: IVolunteerBody
  ): Promise<IVolunteer | null> => {
    const savedVolunteer = await this.create(payload);

    return this.getById(savedVolunteer._id);
  };

  /**
   *
   * @description Get single volunteer details by their phone number
   *
   */
  static getVolunteerByPhoneNumber = (
    phoneNUmber: string
  ): Promise<IVolunteer | null> => {
    return this.getOneByQuery({ phone_number: phoneNUmber });
  };

  /**
   *
   * @description Get single volunteer details by their email address
   *
   */
  static getVolunteerByEmail = (email: string): Promise<IVolunteer | null> => {
    return this.getOneByQuery({ email: email });
  };

  /**
   *
   * @description Get single volunteer details
   *
   */
  static getVolunteerDetails = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return this.getById(volunteerId);
  };

  /**
   *
   * @description Update single volunteer details
   *
   */
  static editVolunteerDetails = (
    volunteerId: string,
    payload: object
  ): Promise<IVolunteer | null> => {
    return this.updateById(volunteerId, payload);
  };

  /**
   *
   * @description Get all volunteers
   *
   */
  static getVolunteers = (
    query: object,
    skip: number,
    limit: number
  ): Promise<IVolunteer[] | null> => {
    return this.getByQuery(query, skip, limit);
  };

  /**
   *
   * @description Deelete single volunteer details
   *
   */
  static deleteVolunteerDetails = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return this.getById(volunteerId);
  };
}

export default VolunteerService;
