require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const server = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");

server.use(morgan("dev"));

server.use(bodyParser.json());

const cors = require("cors");

server.use(cors());

server.use("/api", require("./api"));

const { client } = require("./db");

server.use("*", (req, res, next) => {
  res.status(404);
  res.send({ error: "route not found" });
});

server.use((error, req, res, next) => {
  res.status(500);
  res.send({ error: error.message });
});

server.listen(PORT, () => {
  client.connect();
  console.log("Listening on port:", PORT);
});
