import { Router } from "itty-router";

import { getArticlesController } from "./modules/article/article.controller";

const router = Router();

router.get("/articles", getArticlesController);

export default router;
