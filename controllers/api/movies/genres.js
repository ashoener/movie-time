import { Router } from "express";
import { handleError } from "../../../lib/utils.js";
import { Genre } from "../../../models/index.js";
import requireLoggedInApi from "../../../lib/middleware/requireLoggedInApi.js";

const router = Router();

router.get("/", requireLoggedInApi, async (req, res) => {
  try {
    const genres = await Genre.findAll({
      order: [["id", "ASC"]],
    });
    res.json({ success: true, genres: genres.map((g) => g.name) });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
