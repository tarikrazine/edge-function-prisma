import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import { serialize } from "cookie";

import { createUser, findUser } from "../service/auth.service";
import { signJwt } from "../utils/jwt";
import omit from "../helpers/omit";

export async function signUpHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { name, email, password } = (await request.json()) as {
    name: string;
    email: string;
    password: string;
  };

  const user = await findUser(email);

  if (user) {
    return new Response("User already exists", {
      status: StatusCodes.CONFLICT,
    });
  }

  if (typeof email !== "string") {
    return new Response("Email must not be empty!", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  if (typeof password !== "string") {
    return new Response("Password must not be empty!", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const hashPassword = await bcryptjs.hash(password, 12);

  try {
    const user = await createUser({ name, email, password: hashPassword });

    const omitUser = omit(user, ["password", "createdAt", "updatedAt"]);

    return new Response(JSON.stringify(omitUser), {
      status: StatusCodes.CREATED,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log(error);

    return new Response("Something went wrong!", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function signInHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { email, password } = (await request.json()) as {
    email: string;
    password: string;
  };

  if (typeof email !== "string") {
    return new Response("Email must not be empty!", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  if (typeof password !== "string") {
    return new Response("Password must not be empty!", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const user = await findUser(email);

  if (!user) {
    return new Response("User not found!", { status: StatusCodes.BAD_REQUEST });
  }

  const isValid = await bcryptjs.compare(password, user.password);

  if (!isValid) {
    return new Response("Password is not correct!", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const token = await signJwt({
    id: user.id,
    email: user.email,
    name: user?.name,
  });

  return new Response(token, {
    status: StatusCodes.OK,
    headers: {
      "Set-Cookie": serialize("token", token, {
        httpOnly: true,
        secure: false,
        path: "/",
      }),
    },
  });
}
