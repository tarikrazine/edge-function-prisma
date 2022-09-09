import { StatusCodes } from "http-status-codes";
import { getPost, getPosts } from "../service/post.service";
import { readFrom, writeTo } from "../utils/cache";

export async function getPostsController(
  request: Request,
  event: FetchEvent
): Promise<Response> {
  const cachedPosts = await readFrom(POSTS, "/posts");

  if (cachedPosts) {
    return new Response(JSON.stringify(cachedPosts), {
      status: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const posts = await getPosts();

    if (!posts) {
      return new Response("Posts not found!", {
        status: StatusCodes.NOT_FOUND,
      });
    }

    await writeTo(POSTS, "/posts", posts);

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

  const cachedPost = await readFrom(POSTS, `/posts/${id}`);

  if (cachedPost) {
    return new Response(JSON.stringify(cachedPost), {
      status: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

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

    await writeTo(POSTS, `/posts/${id}`, post);

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

export async function getPostsRevalidateController(
  request: Request,
  event: FetchEvent
) {
  const cacheUpdate = async () => {
    const { type, record, old_record } = await request.json();

    if (type === "INSERT" || type === "UPDATE") {
      await writeTo(POSTS, `/posts/${record.id}`, record);
    }

    if (type === "DELETE") {
      await POSTS.delete(`/posts/${old_record.id}`);
    }

    const posts = await getPosts();

    await writeTo(POSTS, "/posts", posts);
  };

  event.waitUntil(cacheUpdate());

  return new Response(JSON.stringify({ revalidate: "OK" }), {
    status: StatusCodes.OK,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
