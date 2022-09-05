import { Router } from "itty-router";

import { loginHandler } from "./modules/auth/auth.controller";
import { getPostsController } from "./modules/post/post.controller";

const router = Router();

router.post("/auth/login", loginHandler);

router.get("/posts", getPostsController);

export default router;
