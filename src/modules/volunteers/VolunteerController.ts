import { RequestHandler, Request, Response } from "express";

// import required helper utils
import Controller from "@/modules/Controller";

class VolunteerController extends Controller {
  /**
   * Create new volunteer
   *
   * @method POST
   * @route /volunteers
   * @access private
   */
  static createVolunteer: RequestHandler = (req: Request, res: Response) => {
    return res.json(this.successResponse("Volunteer created successfully"));
  };

  /**
   * Get volunteer details by ID
   *
   * @method GET
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static getVolunteerById: RequestHandler = (req: Request, res: Response) => {
    return res.json(
      this.successResponse("Volunteer details retrieved successfully")
    );
  };

  /**
   * Get all volunteers
   *
   * @method GET
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static getAllVolunteers: RequestHandler = (req: Request, res: Response) => {
    return res.json(this.successResponse("Volunteers retrieved successfully"));
  };

  /**
   * Update volunteer details
   *
   * @method PUT
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static updateVolunteerDetails: RequestHandler = (
    req: Request,
    res: Response
  ) => {
    return res.json(
      this.successResponse("Volunteers details updated successfully")
    );
  };

  /**
   * Delete volunteer details
   *
   * @method DELETE
   * @route /volunteers/:volunteer_id
   * @access private
   */
  static deleteVolunteer: RequestHandler = (req: Request, res: Response) => {
    return res.json(
      this.successResponse("Volunteers details deleted successfully")
    );
  };
}

export default VolunteerController;
