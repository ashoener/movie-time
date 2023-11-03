import { parse } from "csv-parse";
import fs from "fs";
import path from 'path';
import Movie from "./models/Movie.js";
import db from "./connection.js";

await db.sync({ force: false });


let typeParser = {
  int: (d) => parseInt(d),
  float: (d) => parseFloat(d),
  bool: (d) => d === "True",
  date: (d) => new Date(d || 0),
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
};
const parser = parse({ delimiter: "," }, async (err, data) => {
  const keys = data.shift();
  const parsed = data
    .map((row) => Object.fromEntries(
        row.map((col, colIndex) => {
          const name = keys[colIndex];
          const type = keyTypes[name];
          return [name, type in typeParser ? typeParser[type](col) : col];
        })
      )
    )
    .filter((r) => !r.adult);
  console.log("Parsed. Inserting %d columns..", parsed.length);
  const startChunk = 0;
  const chunkSize = 1500;
  const chunks = parsed.length / chunkSize;
  for (let i = startChunk * chunkSize; i < parsed.length; i += chunkSize) {
    await Movie.bulkCreate(parsed.slice(i, i + chunkSize), {
      ignoreDuplicates: true,
    });
    console.log("Inserted chunk %d of %d", i / chunkSize, chunks);
  }
  process.exit(0);
});

// const fileName = "test.csv";
const fileName = "TMDB_movie_dataset_v11.csv";

fs.createReadStream(path.join(import.meta.dir, fileName)).pipe(parser);
