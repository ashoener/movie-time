import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

class SavedMovie extends Model {}

SavedMovie.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "movies",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "savedmovies",
    freezeTableName: true,
  }
);

export default SavedMovie;
