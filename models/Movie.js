import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

[
  "id",
  "title",
  "vote_average",
  "vote_count",
  "status",
  "release_date",
  "revenue",
  "runtime",
  "adult",
  "backdrop_path",
  "budget",
  "homepage",
  "imdb_id",
  "original_language",
  "original_title",
  "overview",
  "popularity",
  "poster_path",
  "tagline",
  "genres",
  "production_companies",
  "production_countries",
  "spoken_languages",
];
class Movie extends Model {}

Movie.init(
  {
    title: {
      type: DataTypes.TEXT,
    },
    vote_average: {
      type: DataTypes.FLOAT,
    },
    vote_count: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    revenue: {
      type: DataTypes.BIGINT,
    },
    runtime: {
      type: DataTypes.INTEGER,
    },
    adult: {
      type: DataTypes.BOOLEAN,
    },
    backdrop_path: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.INTEGER,
    },
    homepage: {
      type: DataTypes.TEXT,
    },
    imdb_id: {
      type: DataTypes.STRING,
    },
    original_language: {
      type: DataTypes.STRING,
    },
    original_title: {
      type: DataTypes.STRING,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    popularity: {
      type: DataTypes.FLOAT,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    tagline: {
      type: DataTypes.TEXT,
    },
    genres: {
      type: DataTypes.TEXT,
    },
    production_companies: {
      type: DataTypes.TEXT,
    },
    production_countries: {
      type: DataTypes.TEXT,
    },
    spoken_languages: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "movies",
    freezeTableName: true,
  }
);

export default Movie;
