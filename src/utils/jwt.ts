import jwt, { JwtPayload } from "@tsndr/cloudflare-worker-jwt";

const secretKey = "changeme";

export async function signJwt(payload: JwtPayload) {
  const token = await jwt.sign(payload, secretKey);
  return token;
}

export async function verifyJwt(token: string) {
  try {
    const isValid = await jwt.verify(token, secretKey);

    return isValid;
  } catch (error: any) {
    return null;
  }
}

export function decodeJwt(token: string) {
  try {
    const decode = jwt.decode(token);

    return decode;
  } catch (error: any) {
    return null;
  }
}
