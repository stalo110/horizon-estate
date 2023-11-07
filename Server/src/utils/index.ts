import bcryptjs, { genSalt } from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export class Util {
  static async generateToken(input: Record<string, string>) {
    return Jwt.sign(input, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }
  static async verify(token: string) {
    try {
      const verify = Jwt.verify(token, process.env.JWT_SECRET as string);
      return verify;
    } catch (error) {
      return "token expired";
    }
  }
  static async bcryptEncoded(value: { value: string }) {
    return bcryptjs.hash(value.value, await genSalt());
  }
  static async bcryptDecode(password: string, comparePassword: string) {
    return bcryptjs.compare(password, comparePassword);
  }

  static generateCode(): number {
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  }
}
