export async function signUpHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { email, password } = request.body as any;
  return new Response("good");
}

export async function signInHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { email, password } = request.body as any;
  return new Response("good");
}
