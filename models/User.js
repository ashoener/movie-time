import db from "../config/connection.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
  async validatePassword(password) {
    if (Bun) {
      return Bun.password.verify(password, this.password);
    }
    return bcrypt.compare(password, this.password);
  }
}

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
        if (Bun) {
          newUserData.password = await Bun.password.hash(newUserData.password, {
            algorithm: "bcrypt",
            cost: 10,
          });
        } else {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
        }
        return newUserData;
      },
      async beforeUpdate(newUserData) {
        if (Bun) {
          newUserData.password = await Bun.password.hash(newUserData.password, {
            algorithm: "bcrypt",
            cost: 10,
          });
        } else {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
        }
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
