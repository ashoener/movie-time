import { Router } from "express";
import requireLoggedIn from "../lib/middleware/requireLoggedIn.js";

const router = Router();

router.get("/", requireLoggedIn, async (req, res) => {
  res.render("timeline");
});

export default router;
