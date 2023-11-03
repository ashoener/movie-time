import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

class Language extends Model {}

Language.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "languages",
    freezeTableName: true,
  }
);

export default Language;
