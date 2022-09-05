export async function signUpHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { name, email, password } = request.body as any;

  if (!email) {
    return new Response("Email must not be empty!");
  }

  if (!password) {
    return new Response("Password must not be empty!");
  }

  return new Response("good");
}

export async function signInHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { email, password } = request.body as any;
  return new Response("good");
}
