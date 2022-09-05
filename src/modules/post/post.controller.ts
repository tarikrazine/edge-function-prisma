import { getPosts } from "./post.service";

export async function getPostsController(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const posts = await getPosts();

  return new Response(JSON.stringify(posts), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
