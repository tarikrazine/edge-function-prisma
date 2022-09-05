export async function loginHandler(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const { email, password } = request.body as any;
  return new Response("good");
}
