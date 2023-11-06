import { Router } from "express";

import { Op } from "sequelize";
import { Genre, Movie } from "../../models/index.js";

import { handleError } from "../../lib/utils.js";

const router = Router();

const yearRegex = /^(\d{4})$/;

router.get("/:year", async (req, res) => {
  let genres = [];
  let include = [];
  if (!req.params.year.match(yearRegex))
    return res.status(400).json({ success: false, errors: ["Invalid year"] });
  const year = parseInt(req.params.year);
  if (year < 2000 || year > 2023)
    return res
      .status(400)
      .json({ success: false, errors: ["Year must be between 2000 and 2023"] });
  if (req.query.genres) {
    const validGenres = (
      await Genre.findAll({
        attributes: ["name"],
      })
    ).map((g) => g.name);
    genres = req.query.genres.split(",").filter((g) => validGenres.includes(g));
    include.push({
      model: Genre,
      where: {
        name: { [Op.in]: genres },
      },
      through: {
        attributes: [],
      },
    });
  }
  try {
    const movies = await Movie.findAll({
      where: {
        release_date: {
          [Op.between]: [
            `${req.params.year}-01-01`,
            `${req.params.year}-12-31`,
          ],
        },
        original_language: "en",
      },
      include,
      attributes: [
        "id",
        "title",
        "runtime",
        "popularity",
        "release_date",
        "genres",
      ],
    });
    res.json({
      success: true,
      events: movies.map((m) => ({
        start_date: {
          year: m.release_date.getFullYear(),
          month: m.release_date.getMonth(),
          day: m.release_date.getDate(),
        },
        text: {
          headline: m.title,
          text: "This will be the tagline",
        },
        unique_id: m.id,
      })),
    });
  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
});

export default router;
