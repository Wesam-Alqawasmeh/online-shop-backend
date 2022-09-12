const base64 = require("base-64");
const { UsersTable } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) res.status(403).send("Invalid Login !");
    const basic = req.headers.authorization.split(" ").pop();
    const [username, pass] = base64.decode(basic).split(":");
    req.user = await UsersTable.authenticateBasic(username, pass);
    next();
  } catch (error) {
    res.status(403).send("Invalid Login !");
  }
};
