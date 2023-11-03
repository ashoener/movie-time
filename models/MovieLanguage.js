import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

class MovieLanguage extends Model {}

MovieLanguage.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "movies",
        key: "id",
      },
      unique: false,
    },
    language_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "languages",
        key: "id",
      },
      unique: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "movielanguages",
    freezeTableName: true,
  }
);

export default MovieLanguage;
