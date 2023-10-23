import Volunteer from "@/models/volunteers/Volunteer";
import { IVolunteer } from "@/models/volunteers/types";
import { IVolunteerBody } from "@/modules/volunteers/types";

class VolunteerRepository {
  /**
   *
   * @description Create new volunteer in database
   *
   */
  protected static create = (
    payload: IVolunteerBody
  ): Promise<IVolunteer | null> => {
    return Volunteer.create(payload);
  };

  /**
   *
   * @description Get single volunteer details from database
   *
   */
  protected static getById = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return Volunteer.findById(volunteerId);
  };

  /**
   *
   * @description Get single volunteer details from database by specific condition
   *
   */
  protected static getOneByQuery = (
    query: object
  ): Promise<IVolunteer | null> => {
    return Volunteer.findOne(query);
  };

  /**
   *
   * @description Get all volunteers from database
   *
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
   *
   * @description Get all volunteer from database by specific condition
   *
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
   *
   * @description Update single volunteer details from database
   *
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
   *
   * @description Delete single volunteer details from database
   *
   */
  protected static deleteById = (
    volunteerId: string
  ): Promise<IVolunteer | null> => {
    return Volunteer.findByIdAndDelete(volunteerId);
  };
}

export default VolunteerRepository;
