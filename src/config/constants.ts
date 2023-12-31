const env = process.env;

interface IConstants {
  PORT: string;
  TEST_DATABASE_URI: string;
  PRODUCTION_DATABASE_URI: string;
  ENV: string;
  JWT_SECRET: string;
}

export const constants: IConstants = {
  // application port
  PORT: env.PORT,

  // test databse URI
  TEST_DATABASE_URI: env.TEST_DATABASE_URI,

  // production databse URI
  PRODUCTION_DATABASE_URI: env.PRODUCTION_DATABASE_URI,

  // current environment value
  ENV: env.ENV || "development",

  // Secret value of the JWT
  JWT_SECRET: env.JWT_SECRET,
};
