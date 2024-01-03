import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// import required custom middlewares
import paginationMiddleware from "@/middlewares/paginationMiddleware";
import { handleError } from "@/middlewares/handleError";

// import required helper functions
import { AppError } from "@/utils/exceptions/AppError";
import { HttpCode } from "@/utils/enums/HttpCodeEnums";

// import required routes
import UserRoutes from "@/modules/users/UserRoutes";
import RoleRoutes from "@/modules/roles/RoleRoutes";
import PermissionRoutes from "@/modules/permissions/PermissionRoutes";
import AuthRoutes from "@/modules/authentication/AuthRoutes";

dotenv.config();

const env = process.env;

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeDatabase();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private initializeDatabase = async (): Promise<void> => {
    try {
      if (env.NODE_ENV !== "production") {
        const connection = await this._connectDatabase(env.TEST_DATABASE_URI);
        console.log(
          `Test database connected successfully ${connection.connection.host}`
        );
        return;
      }

      const connection = await this._connectDatabase(
        env.PRODUCTION_DATABASE_URI
      );
      console.log(
        `Production database connected successfully ${connection.connection.host}`
      );
      return;
    } catch (error) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: "Connection to database failed " + error,
      });
    }
  };

  private _connectDatabase = async (uri: string): Promise<any> => {
    return await connect(uri);
  };

  private configureMiddleware(): void {
    // Add middleware here using this.app.use()
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(paginationMiddleware);
  }

  private configureRoutes(): void {
    this.app.use("/api/v1/auth", AuthRoutes);
    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/roles", RoleRoutes);
    this.app.use("/api/v1/permissions", PermissionRoutes);
    this.app.all("*", (req: Request, res: Response) => {
      return res.status(404).json({
        success: false,
        message: `Cannot find ${req.originalUrl} on the server. Please check your url.`,
      });
    });
    this.app.use(handleError);
  }

  public start(): void {
    const port = env.PORT;
    this.app.listen(port, () => {
      console.log(`Server is up and running on port ${port}`);
    });
  }
}

export default App;
