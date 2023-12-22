import jwt from "jsonwebtoken";

const env = process.env;

class JWT {
  /**
   * @description Assign JWT token to user
   *
   * @param {string} payload - The value to assign JWT
   * @returns {string} - A JWT token
   */
  static assignJWT = (payload: object): string => {
    const token = jwt.sign(payload, env.JWT_SECRET);

    return token;
  };

  /**
   * @description Verify JWT token
   *
   * @param {string} token - The JWT token value
   * @returns {string | jwt.JwtPayload } - A decoded JWT payload
   */
  static verifyJWT = (token: string): string | jwt.JwtPayload => {
    const verified = jwt.verify(token, env.JWT_SECRET);
    return verified;
  };
}

export default JWT;
