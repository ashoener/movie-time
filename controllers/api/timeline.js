import { Router } from "express";

import { Op } from "sequelize";
import { Genre, Movie } from "../../models/index.js";

import { getTMDBImageUrl, handleError } from "../../lib/utils.js";

import requireLoggedInApi from "../../lib/middleware/requireLoggedInApi.js";

const router = Router();

const yearRegex = /^(\d{4})$/;

router.get("/:year", requireLoggedInApi, async (req, res) => {
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
      limit: 100,
      attributes: [
        "id",
        "imdb_id",
        "title",
        "runtime",
        "popularity",
        "release_date",
        "genres",
        "overview",
        "tagline",
        "poster_path",
        "backdrop_path",
      ],
      order: [["popularity", "desc"]],
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
          text:
            m.overview +
            `<br><button data-movie="${m.id}" class="btn btn-primary save-movies-btn mt-2">Save to list</button>` +
            `<a target="_blank" href="https://www.themoviedb.org/movie/${m.id}" class="btn btn-primary ms-2 mt-2">View on TMDB</a>` +
            `<a target="_blank" href="https://www.imdb.com/title/${m.imdb_id}" class="btn btn-primary ms-2 mt-2">View on IMDB</a>`,
        },
        media: {
          url: m.backdrop_path.length
            ? getTMDBImageUrl(m.backdrop_path)
            : getTMDBImageUrl(m.poster_path),
          alt: m.title,
          thumbnail: getTMDBImageUrl(m.poster_path),
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
