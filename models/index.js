import Movie from "./Movie.js";
import Genre from "./Genre.js";
import Language from "./Language.js";
import User from "./User.js";
import SavedMovie from "./SavedMovie.js";

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

Movie.belongsToMany(User, {
  through: SavedMovie,
  onDelete: "cascade",
  foreignKey: "movie_id",
});

User.belongsToMany(Movie, {
  through: SavedMovie,
  onDelete: "cascade",
  foreignKey: "user_id",
  as: "saved_movies",
});

// SavedMovie.belongsTo(User, {
//   foreignKey: "user_id",
//   onDelete: "cascade",
// });

// User.hasMany(SavedMovie, {
//   foreignKey: "user_id",
//   onDelete: "cascade",
// });

export { Movie, Genre, Language, User, SavedMovie };
