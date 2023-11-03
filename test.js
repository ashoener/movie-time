import { Op } from "sequelize";
import db from "./config/connection.js";
import { Movie, Genre, Language } from "./models/index.js";

await db.sync({ force: false });

const movies = (
  await Movie.findAll({
    limit: 5,
    include: [
      {
        model: Genre,
        attributes: ["id", "name"],
        where: {
          name: "Crime",
        },
      },
      {
        model: Language,
        attributes: ["id", "name"],
        where: {
          name: "English",
        },
      },
    ],
    where: {
      original_language: "en",
    },
    attributes: [
      "id",
      "release_date",
      "title",
      "budget",
      "revenue",
      "popularity",
      "imdb_id",
    ],
    order: [["popularity", "DESC"]],
  })
).map((m) => m.get({ raw: true }));
console.log(
  Bun.inspect(
    movies.map((m) => ({
      ...m,
      Genres: m.Genres ? m.Genres.map((g) => ({ id: g.id, name: g.name })) : [],
      Languages: m.Languages
        ? m.Languages.map((l) => ({ id: l.id, name: l.name }))
        : [],
    }))
  )
);

process.exit(0);
