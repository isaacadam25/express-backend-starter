import { Request, RequestHandler, Response } from "express";

// import required services
import SmsService from "@/services/SmsService";

// import required helper utils
import Controller from "@/modules/Controller";
import Utils from "@/utils/helpers/Utils";
import { IAnnouncementPayload } from "@/modules/announcements/types";

class AnnouncementController extends Controller {
  /**
   * Send announcement to many users
   *
   * @method POST
   * @route /announcements
   * @access private
   */
  static sendAnnouncement: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
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
