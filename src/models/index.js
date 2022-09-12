const { Sequelize, DataTypes } = require("sequelize");
const productsModel = require("./product-model");
const userModel = require("./user-model");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const ProductsTable = productsModel(sequelize, DataTypes);
const UsersTable = userModel(sequelize, DataTypes);

UsersTable.hasMany(ProductsTable, { foreignKey: "owner_id", sourceKey: "id" });
ProductsTable.belongsTo(UsersTable, {
  foreignKey: "owner_id",
  targetKey: "id",
});

module.exports = {
  db: sequelize,
  ProductsTable,
  UsersTable,
};
