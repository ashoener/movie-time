import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [4, 16],
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "users",
    freezeTableName: true,
  }
);

export default User;
