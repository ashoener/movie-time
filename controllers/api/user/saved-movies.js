import { Router } from "express";
import { User, Movie, SavedMovie } from "../../../models/index.js";

import { handleError } from "../../../lib/utils.js";
import requireLoggedInApi from "../../../lib/middleware/requireLoggedInApi.js";

import { Sequelize } from "sequelize";

const router = Router({ mergeParams: true });

router.use(requireLoggedInApi);

router.get("/", async (req, res) => {
  try {
    const user = (
      await User.findByPk(req.session.user.id, {
        include: [
          {
            model: Movie,
            through: {
              attributes: [],
            },
            as: "saved_movies",
          },
        ],
        attributes: {
          exclude: ["username", "password"],
        },
      })
    ).get({ plain: true });
    res.json({ success: true, movies: user.saved_movies });
  } catch (err) {
    handleError(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.body.movie_id, {
      attributes: ["id"],
    });
    if (!movie)
      return res.status(400).json({
        success: false,
        errors: ["Movie not found"],
      });
    await SavedMovie.create({
      user_id: req.session.user.id,
      movie_id: movie.id,
    });
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
