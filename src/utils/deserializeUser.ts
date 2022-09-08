import { parse } from "cookie";
import { decodeJwt, verifyJwt } from "./jwt";

export async function deserializeUser(request: Request, event: FetchEvent) {
  const cookies = parse(request.headers.get("Cookie") || "");

  const token = cookies.token;

  const isValid = await verifyJwt(token);

  if (isValid) {
    const decode = decodeJwt(token);

    if (decode) {
      request.user = decode.payload;
    }
  }
}
