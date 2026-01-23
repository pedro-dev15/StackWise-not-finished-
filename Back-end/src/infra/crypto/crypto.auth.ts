import crypto from "crypto";
import "dotenv/config";

export function getCrypto(refreshToken: string): string {
  return crypto
    .createHmac("sha256", process.env.REFRESH_TOKEN_SECRET!)
    .update(refreshToken)
    .digest("hex");
}
