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
        notNull: "Username is required",
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8],
        notNull: "Password is required",
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
    },
    timestamps: false,
    sequelize: db,
    tableName: "users",
    freezeTableName: true,
  }
);

export default User;
