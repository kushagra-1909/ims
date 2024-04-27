const express = require("express");
const {
  createItemCtrl,
  getItemsCtrl,
  deleteItemCtrl,
  updateItemCtrl,
  getItemCtrl,
} = require("../controllers/items/itemsCtrl");
const isLogin = require("../middlewares/isLogin");

const itemsRoute = express.Router();

//POST/api/v1/requests
itemsRoute.post("/add-item", isLogin, createItemCtrl);

//GET/api/v1/requests/:id
itemsRoute.get("/:id", isLogin, getItemCtrl);

//DELETE/api/v1/requests/:id
itemsRoute.delete("/:id", isLogin, deleteItemCtrl);

//PUT/api/v1/requests/:id
itemsRoute.put("/:id", isLogin, updateItemCtrl);

//GET/api/v1/requests
itemsRoute.get("/", isLogin, getItemsCtrl);
module.exports = itemsRoute;
