import { Router } from "express";

import { handleError, waitUntil } from "../../../lib/utils.js";
import requireLoggedInApi from "../../../lib/middleware/requireLoggedInApi.js";

const router = Router();

router.get("/", requireLoggedInApi, async (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) return handleError(err, res);
      res.json({ success: true });
    });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
