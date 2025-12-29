import jwt from "jsonwebtoken";
import { LoginRequest } from "../../types/auth";
import "dotenv/config";

const SECRET = process.env.SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.SECRET as string;

//Generate a JWT token
export function generateAcessToken(userId: string): string {
  return jwt.sign({ sub: userId, type: "acess" }, SECRET, { expiresIn: "3m" });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, type: "refresh" }, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
}

//Verify a JWT token
export function verifyRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      sub: string;
      type: string;
    };
    return decoded;
  } catch (err) {
    return null;
  }
}

export function verifyAcessToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as {
      sub: string;
      type: string;
    };
    return decoded;
  } catch (err) {
    return null;
  }
}
