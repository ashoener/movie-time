import { Router } from "express";
import { User } from "../../../models/index.js";

import { handleError } from "../../../lib/utils.js";
import requireLoggedOutApi from "../../../lib/middleware/requireLoggedOutApi.js";

const router = Router();

router.post("/", requireLoggedOutApi, async (req, res) => {
  try {
    const newUser = User.build(req.body);
    await newUser.validate();
    await newUser.save({ validate: false });
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
