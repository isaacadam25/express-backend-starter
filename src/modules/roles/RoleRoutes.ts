import express from "express";

const RoleRoutes: express.Router = express.Router();

// import required controllers
import RoleController from "@/modules/roles/RoleController";

// import required middlewares
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

// import required validation schemas
import RoleValidation from "@/validations/roles/RoleValidation";
import CommonValidation from "@/validations/common/CommonValidation";

RoleRoutes.route("/")
  .post(
    // AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateBody(RoleValidation.validateRoleDetails()),
    RoleController.createRole
  )
  .get(AuthMiddleware.authenticateUser, RoleController.getAllRoles);

RoleRoutes.route("/permissions/:id")
  .put(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateObjectId()),
    ValidationMiddleware.validateBody(
      RoleValidation.validateAddPermissionRole()
    ),
    RoleController.addPermissionToRole
  )
  .delete(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateObjectId()),
    ValidationMiddleware.validateBody(
      RoleValidation.validateRemovePermissionRole()
    ),
    RoleController.removePermissionFromRole
  );

RoleRoutes.route("/:id")
  .get(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateObjectId()),
    RoleController.getSingleRole
  )
  .put(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateObjectId()),
    ValidationMiddleware.validateBody(RoleValidation.validateRoleUpdate()),
    RoleController.updateRoleDetails
  )
  .delete(
    AuthMiddleware.authenticateUser,
    ValidationMiddleware.validateParams(CommonValidation.validateObjectId()),
    RoleController.deleteRole
  );

export default RoleRoutes;
