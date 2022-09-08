import { StatusCodes } from "http-status-codes";

export async function requireUser(request: Request, event: FetchEvent) {
  const user = request.user;

  console.log(user);

  if (!user) {
    return new Response("Not Authenticated", {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
}
