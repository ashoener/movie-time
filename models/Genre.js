import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

class Genre extends Model {}

Genre.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "genres",
    freezeTableName: true,
  }
);

export default Genre;
