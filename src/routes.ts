import { StatusCodes } from "http-status-codes";
import { Router } from "itty-router";

import { signUpHandler, signInHandler } from "./controller/auth.controller";
import {
  getPostController,
  getPostsController,
} from "./controller/post.controller";
import { deserializeUser } from "./utils/deserializeUser";
import { requireUser } from "./utils/requireUser";

const router = Router({ base: "/api" });

router.all("*", deserializeUser);

router.post("/auth/signup", signUpHandler);
router.post("/auth/signin", signInHandler);

router.get("/posts", getPostsController);
router.get("/post/:id", getPostController);

router.get(
  "/me",
  requireUser,
  (request: Request) =>
    new Response(JSON.stringify(request.user), {
      status: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
    })
);

export default router;
