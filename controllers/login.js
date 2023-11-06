import { Router } from "express";
import requireLoggedOut from "../lib/middleware/requireLoggedOut";

const router = Router();

router.get("/", requireLoggedOut, async (req, res) => {
  res.render("login");
});

export default router;
