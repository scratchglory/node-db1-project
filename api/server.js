const express = require("express");
const accountsRouter = require("../accounts/acounts-router");
const server = express();

server.use(express.json());
server.use("/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});
module.exports = server;
