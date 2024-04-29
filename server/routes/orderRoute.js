const express = require("express");
const {
  createOrder,
  getOrdersCtrl,
  placeOrder,
} = require("../controllers/orderController");

const isLogin = require("../middlewares/isLogin");

const orderRoute = express.Router();

orderRoute.post("/add-item", createOrder);

orderRoute.get("/get-orders/:id", getOrdersCtrl);

orderRoute.put("/place-order/:id", placeOrder);

module.exports = orderRoute;
