import { RequestHandler, Request, Response } from "express";
import { isEmpty, isEqualWith } from "lodash";

// import required services
import VolunteerService from "@/modules/volunteers/VolunteerService";

// import required helper utils
import Controller from "@/modules/Controller";
import VolunteerUtils from "@/modules/volunteers/VolunteerUtils";
import {
  IVolunteerPayload,
  IVolunteerReponse,
} from "@/modules/volunteers/types";
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

class VolunteerController extends Controller {
  /**
   * Create new volunteer
   *
   * @method POST
   * @route /volunteers
   * @access private
   */
  static createVolunteer: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const payload: IVolunteerPayload = req.body;

    const existEmail = await VolunteerService.getVolunteerByEmail(
      payload.email
    );
    if (!isEmpty(existEmail)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: `Volunteer with email ${payload.email} already exist`,
      });
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

    return res.json(
      this.successResponse(
        "Volunteer created successfully",
        formattedResponse,
        201
      )
    );
  };

  /**
   * Get volunteer details by ID
   *
   * @method GET
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static getVolunteerById: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
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

    return res.json(
      this.successResponse(
        "Volunteer details retrieved successfully",
        volunteerResponse
      )
    );
  };

  /**
   * Get all volunteers
   *
   * @method GET
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static getAllVolunteers: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
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

      return res.json(
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

    return res.json(
      this.successResponse("Volunteers retrieved successfully", {
        page,
        limit,
        response,
      })
    );
  };

  /**
   * Update volunteer details
   *
   * @method PUT
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static updateVolunteerDetails: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
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

    return res.json(
      this.successResponse(
        "Volunteers details updated successfully",
        volunteerResponse
      )
    );
  };

  /**
   * Delete volunteer details
   *
   * @method DELETE
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static deleteVolunteer: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
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

    return res.json(
      this.successResponse("Volunteers details deleted successfully")
    );
  };
}

export default VolunteerController;
