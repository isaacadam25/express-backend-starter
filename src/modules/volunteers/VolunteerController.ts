import { RequestHandler, Request, Response } from "express";
import { isEmpty, isEqualWith } from "lodash";

// import required services
import VolunteerService from "@/modules/volunteers/VolunteerService";

// import required helper utils
import Controller from "@/modules/Controller";
import VolunteerUtils from "@/modules/volunteers/VolunteerUtils";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

// import required types
import {
  IVolunteerPayload,
  IVolunteerReponse,
} from "@/modules/volunteers/types";

class VolunteerController extends Controller {
  /**
   * @description Create new volunteer
   *
   * @route /volunteers
   * @method POST
   * @access private
   *
   * @param {Request} req - The request object volunteer details payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the created volunteer details.
   * @throws {AppError} If the volunteer email already exists.
   * @throws {AppError} If the volunteer phone number already exists.
   * @throws {AppError} If error occurred during volunteer creation
   */
  static createVolunteer: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const payload: IVolunteerPayload = req.body;

    if (payload.email) {
      const existEmail = await VolunteerService.getVolunteerByEmail(
        payload.email
      );
      if (!isEmpty(existEmail)) {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `Volunteer with email ${payload.email} already exist`,
        });
      }
    }

    const existPhoneNumber = await VolunteerService.getVolunteerByPhoneNumber(
      payload.phoneNumber
    );
    if (!isEmpty(existPhoneNumber)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: `Volunteer with phone number ${payload.phoneNumber} already exist`,
      });
    }

    // format payload details to database required format
    const formattedVolunteer = VolunteerUtils.formatVolunteerDetails(payload);

    const newVolunteer = await VolunteerService.saveVolunteerDetails(
      formattedVolunteer
    );
    if (isEmpty(newVolunteer)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to register new volunteer. Try again later",
      });
    }

    const formattedResponse =
      VolunteerUtils.sanitizeVoluteerDetails(newVolunteer);

    return res
      .status(210)
      .json(
        this.successResponse(
          "Volunteer created successfully",
          formattedResponse
        )
      );
  };

  /**
   * @description Get volunteer details by ID
   *
   * @route /volunteers/:volunteer_id
   * @method GET
   * @access private
   *
   * @param {Request} req - The request object volunteer id.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the created volunteer details.
   * @throws {AppError} If the volunteer details not found.
   */
  static getVolunteerById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const volunteerId: string = req.params.volunteer_id;

    const existVolunteer = await VolunteerService.getVolunteerDetails(
      volunteerId
    );
    if (isEmpty(existVolunteer)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Volunteer details not found. Try again later",
      });
    }

    const volunteerResponse =
      VolunteerUtils.sanitizeVoluteerDetails(existVolunteer);

    return res
      .status(200)
      .json(
        this.successResponse(
          "Volunteer details retrieved successfully",
          volunteerResponse
        )
      );
  };

  /**
   * @description Get all volunteers
   *
   * @route /volunteers
   * @method GET
   * @access private
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the retrieved volunteers.
   * @throws {AppError} If no volunteer details found.
   */
  static getAllVolunteers: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const { page, limit } = req.pagination;
    const { name } = req.query;
    let response: IVolunteerReponse[] = [];

    if (!isEmpty(name)) {
      const volunteers = await VolunteerService.getVolunteers(
        {
          $or: [
            { first_name: { $regex: `.*${name}.*`, $options: "i" } },
            { last_name: { $regex: `.*${name}.*`, $options: "i" } },
          ],
        },
        page,
        limit
      );
      if (isEmpty(volunteers)) {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Volunteers not found at the moment",
        });
      }

      for (const volunteer of volunteers) {
        response.push(VolunteerUtils.sanitizeVoluteerDetails(volunteer));
      }

      return res.status(200).json(
        this.successResponse("Volunteers retrieved successfully", {
          page,
          limit,
          response,
        })
      );
    }

    const volunteers = await VolunteerService.getVolunteers({}, page, limit);
    if (isEmpty(volunteers)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Volunteers not found at the moment",
      });
    }

    for (const volunteer of volunteers) {
      response.push(VolunteerUtils.sanitizeVoluteerDetails(volunteer));
    }

    return res.status(200).json(
      this.successResponse("Volunteers retrieved successfully", {
        page,
        limit,
        response,
      })
    );
  };

  /**
   * @description Update volunteer details
   *
   * @route /volunteers/:volunteer_id
   * @method PUT
   * @access private
   *
   * @param {Request} req - The request object containing volunteer details.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} - A response indicating the updated volunteer.
   * @throws {AppError} - If selected volunteer details not found.
   * @throws {AppError} - If selected volunteer details duplicates email.
   * @throws {AppError} - If selected volunteer details duplicates phone number.
   * @throws {AppError} - If failed to update volunteer details.
   */
  static updateVolunteerDetails: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const volunteerId: string = req.params.volunteer_id;
    const payload: IVolunteerPayload = req.body;

    const existVolunteer = await VolunteerService.getVolunteerDetails(
      volunteerId
    );
    if (isEmpty(existVolunteer)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Volunteer details not found. Try again later",
      });
    }

    const existEmail = await VolunteerService.getVolunteerByEmail(
      payload.email
    );
    if (
      !isEmpty(existEmail) &&
      !isEqualWith(volunteerId, existEmail._id.toString())
    ) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: `Volunteer with email ${payload.email} already exist`,
      });
    }

    const existPhoneNumber = await VolunteerService.getVolunteerByPhoneNumber(
      payload.phoneNumber
    );
    if (
      !isEmpty(existPhoneNumber) &&
      !isEqualWith(volunteerId, existPhoneNumber._id.toString())
    ) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: `Volunteer with phone number ${payload.phoneNumber} already exist`,
      });
    }

    const formattedVolunteer = VolunteerUtils.formatVolunteerDetails(payload);

    const updatedVolunteer = await VolunteerService.editVolunteerDetails(
      volunteerId,
      formattedVolunteer
    );
    if (isEmpty(updatedVolunteer)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Failed to update volunteer details. Try again later",
      });
    }

    const volunteerResponse =
      VolunteerUtils.sanitizeVoluteerDetails(updatedVolunteer);

    return res
      .status(200)
      .json(
        this.successResponse(
          "Volunteers details updated successfully",
          volunteerResponse
        )
      );
  };

  /**
   * @description Delete volunteer details by ID
   *
   * @route /volunteers/:volunteer_id
   * @method DELETE
   * @access private
   *
   * @param {Request} req - The request object volunteer id.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the volunteer details deleted
   * @throws {AppError} If the volunteer details not found.
   * @throws {AppError} If volunteer is active.
   * @throws {AppError} If failed to delete volunteer details.
   */
  static deleteVolunteer: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const volunteerId: string = req.params.volunteer_id;

    const existVolunteer = await VolunteerService.getVolunteerDetails(
      volunteerId
    );
    if (isEmpty(existVolunteer)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Volunteer details not found. Try again later",
      });
    }

    // do not delete active volunteer
    if (existVolunteer.status) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Active volunteer cannot be deleted",
      });
    }

    const deletedVolunteer = await VolunteerService.deleteVolunteerDetails(
      volunteerId
    );
    if (isEmpty(deletedVolunteer)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Volunteer details not found. Try again later",
      });
    }

    return res
      .status(200)
      .json(this.successResponse("Volunteers details deleted successfully"));
  };
}

export default VolunteerController;
