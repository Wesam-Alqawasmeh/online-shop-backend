const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ id: this.id, email: this.email }, process.env.SECRET);
      },
      set(tokenObj) {
        const token = jwt.sign(tokenObj, process.env.SECRET);
      },
    },
  });

  model.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
  });

  model.authenticateBasic = async (username, password) => {
    try {
      const user = await model.findOne({ where: { username } });
      const validate = await bcrypt.compare(password, user.password);
      if (validate) return user;

      throw new Error("Invalid User !!!");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  model.authenticateToken = async (token) => {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = await model.findOne({ where: { id: parsedToken.id } });
      if (user) return user;

      throw new Error("User Not Found !!!!");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return model;
};

module.exports = userModel;
