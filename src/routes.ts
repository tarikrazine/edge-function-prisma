import { Router } from "itty-router";

import { signInHandler } from "./modules/auth/auth.controller";
import { getPostsController } from "./modules/post/post.controller";

const router = Router();

router.post("/auth/signin", signInHandler);
router.post("/auth/signup", signInHandler);

router.get("/posts", getPostsController);

export default router;
