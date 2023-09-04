import { Router } from "express";

const AuthRoutes: Router = Router();

// import required controllers
import AuthController from "@/modules/authentication/AuthController";

// import required middlewares
import validationMiddleware from "@/middlewares/ValidationMiddleware";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

// import required validation schemas
import AuthValidation from "@/validations/authentication/AuthValidation";

AuthRoutes.route("/login").post(
  validationMiddleware.validateBody(AuthValidation.validateLogin()),
  AuthController.userLogin
);

AuthRoutes.route("/change-password").post(
  AuthMiddleware.authenticateUser,
  validationMiddleware.validateBody(AuthValidation.validateChangePassword()),
  AuthController.changePassword
);

export default AuthRoutes;
