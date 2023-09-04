import express from "express";

const PermissionRoutes: express.Router = express.Router();

// import required controllers
import PermisssionController from "@/modules/permissions/PermissionController";

// import required middlewares
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";

// import required validation schema
import PermissionValidation from "@/validations/permisssion/PermissionValidation";
import CommonValidation from "@/validations/common/CommonValidation";

// create permission route
PermissionRoutes.route("/")
  .post(
    ValidationMiddleware.validateBody(
      PermissionValidation.validatePermissionDetails()
    ),
    PermisssionController.createPermisssion
  )
  .get(PermisssionController.getAllPermissions);

PermissionRoutes.route("/:id").get(
  ValidationMiddleware.validateParams(CommonValidation.validateObjectId()),
  PermisssionController.getSinglePermission
);

export default PermissionRoutes;
