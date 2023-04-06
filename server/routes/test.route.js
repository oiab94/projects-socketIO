import { Router } from "express";
import * as testController from "../controllers/test.controller";

const router = Router();

router.get("/api/test", testController.test_get);

export default router;