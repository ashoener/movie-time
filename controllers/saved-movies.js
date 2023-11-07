import { Router } from "express";
import { handleError } from "../lib/utils.js";
import requireLoggedIn from "../lib/middleware/requireLoggedIn.js";

import { User, Movie, Genre, Language } from "../models/index.js";

const router = Router();

router.get("/", requireLoggedIn, async (req, res) => {
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
    res.render("savedMovies", { savedMovies: user.saved_movies });
  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
});


export default router;
