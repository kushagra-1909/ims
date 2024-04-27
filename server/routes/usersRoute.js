const express = require("express");
const {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  getAllUserCtrl,
  getSingleUserCtrl,
} = require("../controllers/users/usersCtrl");
const isLogin = require("../middlewares/isLogin.js");
const usersRoute = express.Router();

usersRoute.post("/admin-dashboard", isLogin, registerUserCtrl);

usersRoute.post("/login", userLoginCtrl);

usersRoute.get("/profile", isLogin, userProfileCtrl);

usersRoute.get("/get-all-users", isLogin, getAllUserCtrl);

usersRoute.get("/get-single-user/:id", isLogin, getSingleUserCtrl);

usersRoute.delete("/:id", isLogin, deleteUserCtrl);

usersRoute.put("/:id", isLogin, updateUserCtrl);

module.exports = usersRoute;
