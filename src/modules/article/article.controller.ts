import { prisma } from "../../utils/prisma";

export async function getArticlesController(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const posts = await prisma.post.findMany();

  return new Response(JSON.stringify(posts), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
