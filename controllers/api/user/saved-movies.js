import { Router } from "express";
import {
  User,
  Movie,
  Genre,
  Language,
  SavedMovie,
} from "../../../models/index.js";

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
            include: [
              {
                model: Genre,
                attributes: ["id", "name"],
                through: {
                  attributes: [],
                },
              },
              {
                model: Language,
                attributes: ["id", "name"],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: ["username", "password"],
        },
      })
    ).get({ plain: true });
    res.json({ success: true, movies: user.saved_movies });
  } catch (err) {
    console.log(err);
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
    const exists = await SavedMovie.count({
      where: {
        user_id: req.session.user.id,
        movie_id: movie.id,
      },
    });
    if (exists)
      return res
        .status(400)
        .json({ success: false, errors: ["Movie is already added to list"] });
    await SavedMovie.create({
      user_id: req.session.user.id,
      movie_id: movie.id,
    });
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rowsAffected = await SavedMovie.destroy({
      where: {
        user_id: req.session.user.id,
        movie_id: req.params.id,
      },
    });
    if (!rowsAffected) {
      return res.status(400).json({
        success: false,
        errors: ["That movie was not saved to your list"],
      });
    }
    res.json({ success: true });
  } catch (err) {
    handleError(err, res);
  }
});


export default router;
