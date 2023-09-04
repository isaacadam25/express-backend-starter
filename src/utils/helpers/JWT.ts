import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const env = process.env;

class JWT {
  static assignJWT = (payload: object): string => {
    const token = jwt.sign(payload, env.JWT_SECRET);

    return token;
  };

  static verifyJWT = (token: string) => {
    const verified = jwt.verify(token, env.JWT_SECRET);
    return verified;
  };
}

export default JWT;
