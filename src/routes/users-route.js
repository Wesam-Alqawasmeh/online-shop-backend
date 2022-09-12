const express = require("express");
const usersRouter = express.Router();
const { UsersTable } = require("../models/index");
const basicAuth = require("../middleware/basic");
const bearerAuth = require("../middleware/bearer");
require("dotenv").config();

usersRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await UsersTable.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

usersRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

usersRouter.post("/log-in", bearerAuth, async (req, res) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = usersRouter;
