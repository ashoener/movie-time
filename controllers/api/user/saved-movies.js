import { Router } from "express";
import { User, Movie } from "../../../models/index.js";

import { handleError } from "../../../lib/utils.js";
import requireLoggedInApi from "../../../lib/middleware/requireLoggedInApi.js";

import { Sequelize } from "sequelize";

const router = Router({ mergeParams: true });

router.get("/", requireLoggedInApi, async (req, res) => {
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
    console.log(err);
    handleError(err, res);
  }
});

export default router;
