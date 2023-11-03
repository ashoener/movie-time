import { Router } from "express";
import { User } from "../../../models/index.js";

import { BaseError } from "sequelize";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newUser = User.build(req.body);
    await newUser.validate();
    await newUser.save({ validate: false });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof BaseError) {
      err.errors = err.errors.map((e) => e.message);
    }
    res.status(500).json({ success: false, errors: err.errors });
  }
});

export default router;
