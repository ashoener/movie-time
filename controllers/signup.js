import { Router } from "express";
import requireLoggedOut from "../lib/middleware/requireLoggedOut.js";

const router = Router();

router.get("/", requireLoggedOut, async (req, res) => {
  res.render("signup");
});

export default router;
