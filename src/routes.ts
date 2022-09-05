import { Router } from "itty-router";

import { signUpHandler, signInHandler } from "./modules/auth/auth.controller";
import { getPostsController } from "./modules/post/post.controller";

const router = Router();

router.post("/auth/signup", signUpHandler);
router.post("/auth/signin", signInHandler);

router.get("/posts", getPostsController);

export default router;
