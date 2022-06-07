const express = require("express");
const authentication = require("../middlewares/authentication");

const { order } = require("../controllers/orderhistory");

const orderRouter = express.Router();
orderRouter.post("/", authentication, order);
module.exports = orderRouter;
