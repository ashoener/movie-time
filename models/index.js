import Movie from "./Movie.js";
import Genre from "./Genre.js";
import Language from "./Language.js";
import User from "./User.js";

import MovieGenre from "./MovieGenre.js";
import MovieLanguage from "./MovieLanguage.js";

Movie.belongsToMany(Genre, {
  through: MovieGenre,
  onDelete: "cascade",
  foreignKey: "movie_id",
});
Genre.belongsToMany(Movie, {
  through: MovieGenre,
  onDelete: "cascade",
  foreignKey: "genre_id",
});

Movie.belongsToMany(Language, {
  through: MovieLanguage,
  onDelete: "cascade",
  foreignKey: "movie_id",
});
Language.belongsToMany(Movie, {
  through: MovieLanguage,
  onDelete: "cascade",
  foreignKey: "language_id",
});

export { Movie, Genre, Language, User };
