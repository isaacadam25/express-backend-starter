import { Router } from "express";

const AnnouncementRoutes: Router = Router();

// import required controller
import AnnouncementController from "@/modules/announcements/AnnouncementController";

// import required middlewares
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";

// import required validation schemas
import AnnouncementValidation from "@/validations/announcements/AnnouncementValidation";

AnnouncementRoutes.route("/").post(
  AuthMiddleware.authenticateUser,
  ValidationMiddleware.validateBody(AnnouncementValidation.validateDetails()),
  AnnouncementController.sendAnnouncement
);

export default AnnouncementRoutes;
