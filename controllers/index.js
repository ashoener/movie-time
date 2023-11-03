import { Router } from "express";
import populateLocals from "../lib/middleware/populateLocals.js";

const router = Router();

router.use(populateLocals);

router.get("/", (req, res) => {
  res.sendStatus(200);
});

export default router;
