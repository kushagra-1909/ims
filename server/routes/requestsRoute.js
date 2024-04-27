const express = require("express");
const {
  createRequestCtrl,
  getRequestsCtrl,
  deleteRequestCtrl,
  updateRequestCtrl,
  getRequestCtrl,
  partialDeclineRequestCtrl,
  partialApproveRequestCtrl,
} = require("../controllers/requests/requestsCtrl");
const isLogin = require("../middlewares/isLogin");

const requestRoute = express.Router();

//POST/api/v1/requests
requestRoute.post("/", isLogin, createRequestCtrl);

//GET/api/v1/requests/:id
requestRoute.get("/:id", isLogin, getRequestCtrl);

//DELETE/api/v1/requests/:id
requestRoute.delete("/:id", isLogin, deleteRequestCtrl);

//PUT/api/v1/requests/:id
requestRoute.put("/:id", isLogin, updateRequestCtrl);

//GET/api/v1/requests
requestRoute.get("/", isLogin, getRequestsCtrl);

requestRoute.post("/partial-decline", isLogin, partialDeclineRequestCtrl);

requestRoute.post("/partial-approve", isLogin, partialApproveRequestCtrl);

module.exports = requestRoute;
