import "express-async-errors";
import { Router } from "express";

// import required controller
import UserController from "@/modules/users/UserController";

// import required validation schemas
import UserValidation from "@/validations/users/UserValidation";

// import required middlewares
import ValidationMiddleware from "@/middlewares/ValidationMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

const UserRoutes: Router = Router();

UserRoutes.route("/").post(
  // AuthMiddleware.authenticateUser,
  // AuthMiddleware.authorizeUser("create-user"),
  ValidationMiddleware.validateBody(UserValidation.validateRegistration()),
  UserController.createUser
);

UserRoutes.route("/:user_id/roles/:role_id").put(
  AuthMiddleware.authenticateUser,
  ValidationMiddleware.validateParams(UserValidation.validateAssignRole()),
  UserController.assignRoleToUser
);

export default UserRoutes;
