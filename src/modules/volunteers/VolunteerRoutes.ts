import { Router } from "express";

const VolunteerRoutes: Router = Router();

// import required controller
import VolunteerController from "@/modules/volunteers/VolunteerController";

// import required middlewares
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";

// import required validation schemas
import VolunteerValidation from "@/validations/volunteers/VolunteerValidation";
import CommonValidation from "@/validations/common/CommonValidation";

VolunteerRoutes.route("/")
  .post(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateBody(
      VolunteerValidation.validateRegistration()
    ),
    VolunteerController.createVolunteer
  )
  .get(AuthMiddleware.authenticateUser, VolunteerController.getAllVolunteers);

VolunteerRoutes.route("/:volunteer_id")
  .get(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateVolunteerId()),
    VolunteerController.getVolunteerById
  )
  .put(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateVolunteerId()),
    VolunteerController.updateVolunteerDetails
  )
  .delete(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateVolunteerId()),
    VolunteerController.deleteVolunteer
  );

export default VolunteerRoutes;
