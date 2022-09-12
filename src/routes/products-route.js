const express = require("express");
const bearerAuth = require("../middleware/bearer");
const productsRouter = express.Router();
const { ProductsTable } = require("../models/index");

productsRouter.get("/", bearerAuth, async (req, res) => {
  try {
    let products;
    if (req.query.sort) {
      products = await ProductsTable.findAll({
        where: { category: req.query.sort },
      });
    } else {
      products = await ProductsTable.findAll();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductsTable.findOne({ where: { id } });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

productsRouter.post("/", bearerAuth, async (req, res) => {
  try {
    const { title, price, description, category, image, owner_id } = req.body;
    const product = await ProductsTable.create({
      title,
      price,
      description,
      category,
      image,
      owner_id,
    });
    res.status(204).send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

productsRouter.put("/:id", bearerAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, description, category, image } = req.body;
    const updatedProduct = await ProductsTable.update(req.body, {
      where: { id },
    });
    res.status(204).send(updatedProduct);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

productsRouter.delete("/:id", bearerAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await ProductsTable.destroy({ where: { id } });
    res.send(deletedProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = productsRouter;
