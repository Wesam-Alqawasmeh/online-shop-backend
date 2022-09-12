const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/users-route");
const productsRouter = require("./routes/products-route");
const seedRouter = require("./routes/seed-route");
const notFoundHandler = require("./error-handlers/404");
const errorsHandler = require("./error-handlers/500");

app.use(cors());
app.use(morgan("dev"));

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/seed", seedRouter);

app.use("*", notFoundHandler);
app.use(errorsHandler);

function startServer() {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = {
  start: startServer,
};
