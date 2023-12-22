import Volunteer from "@/models/volunteers/Volunteer";

// import required types
import { IVolunteer } from "@/models/volunteers/types";
import { IVolunteerBody } from "@/modules/volunteers/types";

class VolunteerRepository {
  /**
   * @description Create a new volunteer.
   * @param {IVolunteerBody} payload - The data for creating a new volunteer.
   * @returns {Promise<IVolunteer | null>} A promise that resolves to the created volunteer or null.
   */
  protected static create = (
    payload: IVolunteerBody
  ): Promise<IVolunteer | null> => {
    return Volunteer.create(payload);
  };

  /**
   * @description Get single volunteer details.
   * @param {string} volunteerId - The volunteer id.
   * @returns {Promise<IVolunteer | null>} A promise that resolves the retrieved volunteer or null.
   */
  protected static getById = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return Volunteer.findById(volunteerId);
  };

  /**
   * @description Get single volunteer details from database by specific condition
   * @param {object} query - The data for creating a new volunteer.
   * @returns {Promise<IVolunteer | null>} A promise that resolves the retrieved volunteer or null.
   */
  protected static getOneByQuery = (
    query: object
  ): Promise<IVolunteer | null> => {
    return Volunteer.findOne(query);
  };

  /**
   * @description Get all volunteers from database
   * @param {number} skip - The page accessed.
   * @param {number} limit - The limit of data from database.
   * @returns {Promise<IVolunteer | null>} A promise that resolves the retrieved volunteers or null.
   */
  protected static getAll = (
    skip: number,
    limit: number
  ): Promise<IVolunteer[] | null> => {
    return Volunteer.find()
      .skip((skip - 1) * limit)
      .limit(limit);
  };

  /**
   * @description Get all volunteer from database by specific condition
   * @param {object} query - The data for creating a new volunteer.
   * @param {number} skip - The page accessed.
   * @param {number} limit - The limit of data from database.
   * @returns {Promise<IVolunteer | null>} A promise that resolves the retrieved volunteers or null.
   */
  protected static getByQuery = (
    query: object,
    skip: number,
    limit: number
  ): Promise<IVolunteer[] | null> => {
    return Volunteer.find(query)
      .skip((skip - 1) * limit)
      .limit(limit);
  };

  /**
   * @description Update single volunteer details from database.
   * @param {string} volunteerId - The volunteer id.
   * @param {object} payload - The updated volunteer details
   * @returns {Promise<IVolunteer | null>} A promise that resolves the updated volunteer or null.
   */
  protected static updateById = (
    volunteerId: string,
    payload: object
  ): Promise<IVolunteer | null> => {
    return Volunteer.findByIdAndUpdate(volunteerId, payload, {
      returnDocument: "after",
      timestamps: true,
    });
  };

  /**
   * @description Delete single volunteer details from database
   * @param {string} volunteerId - The volunteer id.
   * @returns {Promise<IVolunteer | null>} A promise that resolves the deleted volunteer or null.
   */
  protected static deleteById = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return Volunteer.findByIdAndDelete(volunteerId);
  };
}

export default VolunteerRepository;
