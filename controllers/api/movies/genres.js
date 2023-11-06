import { Router } from "express";
import { handleError } from "../../../lib/utils";
import { Genre } from "../../../models";

const router = Router();

router.get("/", async (req, res) => {
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
