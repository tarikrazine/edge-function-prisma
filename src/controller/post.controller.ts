import { StatusCodes } from "http-status-codes";
import { getPost, getPosts } from "../service/post.service";

export async function getPostsController(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  try {
    const posts = await getPosts();

    if (!posts) {
      return new Response("Posts not found!", {
        status: StatusCodes.NOT_FOUND,
      });
    }

    return new Response(JSON.stringify(posts), {
      status: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log(error);

    return new Response("Something went wrong", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function getPostController(request: Request, event: FetchEvent) {
  const { id } = await request.params;

  try {
    const post = await getPost(parseInt(id));

    if (!post) {
      return new Response("Post not found!", {
        status: StatusCodes.NOT_FOUND,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(post), {
      status: StatusCodes.OK,
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
