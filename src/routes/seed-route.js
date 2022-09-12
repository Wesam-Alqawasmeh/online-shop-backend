const express = require("express");
const seedRoute = express.Router();
const axios = require("axios");
const { ProductsTable } = require("../models/index");
const data = require("../assets/data.json");
require("dotenv").config();

seedRoute.post("/", async (req, res) => {
  try {
    data.products.map(async (item) => {
      await ProductsTable.create({
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.thumbnail,
        rate: item.rating,
      });
    });

    res.send("Database seeded successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = seedRoute;
