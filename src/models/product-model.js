const products = (sequelize, DataTypes) =>
  sequelize.define("products", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(10485760),
      defaultValue: "Description is not available",
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://www.suzukijember.com/gallery/gambar_product/default.jpg",
    },
    rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    rateCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });

module.exports = products;
