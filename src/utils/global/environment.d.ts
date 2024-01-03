export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PRODUCTION_DATABASE_URI: string;
      TEST_DATABASE_URI: string;
      PORT: string;
      JWT_SECRET: string;
    }
  }
}
