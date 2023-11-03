import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [4, 16],
        notNull: { msg: "Username is required" },
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: "Password must be at least 8 characters long",
          args: [8],
        },
        notNull: { msg: "Password is required" },
      },
      allowNull: false,
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    timestamps: false,
    sequelize: db,
    tableName: "users",
    freezeTableName: true,
  }
);

export default User;
