import jwt from "jsonwebtoken";
import { LoginRequest } from "../../types/auth";
import "dotenv/config";

const SECRET = process.env.SECRET as string;

//Generate a JWT token
export function generateToken(email: string): string {
  const token = jwt.sign({ email: email }, SECRET, { expiresIn: "1h" });
  return token;
}

//Verify a JWT token
export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    return decoded.email;
  } catch (err) {
    return null;
  }
}
