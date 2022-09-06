import { getPosts } from "../service/post.service";

export async function getPostsController(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  console.log(request.user);
  try {
    const posts = await getPosts();

    return new Response(JSON.stringify(posts), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log(error);

    return new Response("Something went wrong");
  }
}
