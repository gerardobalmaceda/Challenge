import jwt from "jsonwebtoken";
import config from "../../config";
import { IUser, IUserToken } from "../../interfaces/IUser";

declare module "jsonwebtoken" {
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions
  ): { [key: string]: string };
}

export const generateOut = (user: IUser) => {
  return {
    access_token: encodeToken({ email: user.legajo }),
    profile: {
      _id: user._id,
      firstname: user.nombre,
      lastname: user.apellido
    },
  };
};

export const encodeToken = (data: IUserToken): string => {
  const token = jwt.sign(data, config.token.secret, {
    expiresIn: config.token.expiresIn,
  });
  return token;
};
export const decodeToken = (token: string): { email: string } => {
  try {
    const { email } = jwt.verify(token, config.token.secret, {});
    return { email };
  } catch (err) {
    throw err;
  }
};
