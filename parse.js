import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { Movie, Genre, Language } from "./models/index.js";
import MovieLanguage from "./models/MovieLanguage.js";
import MovieGenre from "./models/MovieGenre.js";
import db from "./config/connection.js";

await db.sync({ force: false });

const genres = new Set();
const languages = new Set();

let typeParser = {
  int: (d) => parseInt(d),
  float: (d) => parseFloat(d),
  bool: (d) => d === "True",
  date: (d) => new Date(d || 0),
  array: (d) => d.split(", "),
};
let keyTypes = {
  id: "int",
  vote_average: "float",
  vote_count: "int",
  release_date: "date",
  revenue: "int",
  runtime: "int",
  adult: "bool",
  budget: "int",
  popularity: "float",
  genres: "array",
  production_companies: "array",
  production_countries: "array",
  spoken_languages: "array",
};
const parser = parse({ delimiter: "," }, async (err, data) => {
  const keys = data.shift();
  const parsed = data
    .map((row) =>
      Object.fromEntries(
        row.map((col, colIndex) => {
          const name = keys[colIndex];
          const type = keyTypes[name];
          return [name, type in typeParser ? typeParser[type](col) : col];
        })
      )
    )
    .filter((r) => !r.adult);
  for (let row of parsed) {
    for (let genre of row.genres) {
      genres.add(genre);
    }
    row.genres = row.genres.map((g) => ({
      movie_id: row.id,
      genre_id: [...genres].indexOf(g) + 1,
    }));
    for (let lang of row.spoken_languages) {
      languages.add(lang);
    }
    row.spoken_languages = row.spoken_languages.map((l) => ({
      movie_id: row.id,
      language_id: [...languages].indexOf(l) + 1,
    }));
  }
  await Genre.bulkCreate(
    [...genres].map((g) => ({
      name: g,
    })),
    { ignoreDuplicates: true }
  );
  await Language.bulkCreate(
    [...languages].map((l) => ({
      name: l,
    })),
    { ignoreDuplicates: true }
  );
  const spokenLanguages = parsed.flatMap((r) => r.spoken_languages);
  const genresToInsert = parsed.flatMap((r) => r.genres);
  console.log("Inserting movies. %d columns..", parsed.length);
  await insertByChunk(Movie, parsed);
  console.log("Inserting languages. %d columns..", spokenLanguages.length);
  await insertByChunk(MovieLanguage, spokenLanguages);
  console.log("Inserting genres. %d columns..", genresToInsert.length);
  await insertByChunk(MovieGenre, genresToInsert);
  process.exit(0);
});

async function insertByChunk(model, data, startChunk = 0, chunkSize = 1500) {
  const chunks = data.length / chunkSize;
  for (let i = startChunk * chunkSize; i < data.length; i += chunkSize) {
    await model.bulkCreate(data.slice(i, i + chunkSize), {
      ignoreDuplicates: true,
    });
    console.log(
      "[%s] Inserted chunk %d of %d",
      model.tableName,
      i / chunkSize,
      chunks
    );
  }
}

// const fileName = "test.csv";
const fileName = "TMDB_movie_dataset_v11.csv";

fs.createReadStream(path.join(import.meta.dir, fileName)).pipe(parser);
