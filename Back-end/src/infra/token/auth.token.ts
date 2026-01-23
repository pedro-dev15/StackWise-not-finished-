import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

//Generate a JWT token
export function generateAcessToken(userId: string): string {
  return jwt.sign({ sub: userId, type: "access" }, SECRET, { expiresIn: "5m" });
}

export function generateRefreshToken(refreshTokenId: string): string {
  return jwt.sign(
    { sub: refreshTokenId, type: "refresh" },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

//Verify a JWT token

export function verifyAcessToken(token: string) {
  try {
    const payload = jwt.verify(token, SECRET) as {
      sub: string;
      type: string;
    };
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export function verifyRefreshToken(token: string) {
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      sub: string;
      type: string;
    };
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
