import { Router } from "itty-router";

import { signUpHandler, signInHandler } from "./controller/auth.controller";
import { getPostsController } from "./controller/post.controller";

const router = Router();

router.post("/auth/signup", signUpHandler);
router.post("/auth/signin", signInHandler);

router.get("/posts", getPostsController);

export default router;
