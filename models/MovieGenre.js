import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

class MovieGenre extends Model {}

MovieGenre.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "movies",
        key: "id",
      },
      unique: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "genres",
        key: "id",
      },
      unique: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "moviegenres",
    freezeTableName: true,
  }
);

export default MovieGenre;
