import { Request, RequestHandler, Response } from "express";

// import required services
import SmsService from "@/services/SmsService";

// import required helper utils
import Controller from "@/modules/Controller";
import Utils from "@/utils/helpers/Utils";

// import required types
import { IAnnouncementPayload } from "@/modules/announcements/types";

class AnnouncementController extends Controller {
  /**
   * @description Send announcement to user
   *
   * @route /announcements
   * @method POST
   * @access Private
   *
   * @param {Request} req - The request object announcements details payload.
   * @param {Response} res - The response object used to send the response.
   * @returns {Response} A response indicating the sent announcement details.
   */
  static sendAnnouncement: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const payload: IAnnouncementPayload = req.body;

    for (const phoneNumber of payload.receivers) {
      await SmsService.sendSms(
        payload.message,
        Utils.formatPhoneNumber(phoneNumber)
      );
    }

    return res
      .status(200)
      .json(this.successResponse("Announcement sent successfully", payload));
  };
}

export default AnnouncementController;
