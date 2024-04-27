const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");

// All buisness logic lies here

const registerUserCtrl = async (req, res, next) => {
  const {
    username,
    password,
    email,
    designation,
    department,
    role,
    mobileNo,
    officeLocation,
  } = req.body;
  try {
    // check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exist", 400));
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      designation,
      department,
      role,
      mobileNo,
      officeLocation,
    });
    res.json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      next(appErr("Invalid login credentials", 400));
    }

    // check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) return next(appErr("Invalid login credentials", 400));

    res.json({
      status: "success",
      username: userFound.username,
      id: userFound._id,
      token: generateToken(userFound._id),
      message: "logged in successfully",
      role: userFound.role,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "requests",
      populate: {
        path: "Items.item",
      },
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getAllUserCtrl = async (req, res, next) => {
  try {
    const user = await User.find({}).populate({
      path: "requests",
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getSingleUserCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: "requests",
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const deleteUserCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const updateUserCtrl = async (req, res, next) => {
  try {
    let message2 = null;
    let userFound = await User.findById(req.params.id);
    // check if user is updating the password
    if (req.body.old_password && req.body.new_password) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.old_password,
        userFound.password
      );
      // console.log("in passowrd change: ",hashedPassword);
      //update the user
      if (isPasswordMatch) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.new_password, salt);
        userFound.password = hashedPassword;
        console.log("password change!!!");
        message2 = "password updated";
      }
    }
    userFound.username = req.body.username;
    userFound.email = req.body.email;
    userFound.phone = req.body.phone;
    userFound.department = req.body.department;
    const user = await User.findByIdAndUpdate(userFound._id, userFound, {
      new: true,
      runValidators: true,
    });
    //send the response
    res.status(200).json({
      status: "success",
      data: user,
      message: " user data Updated successfully",
      message2: message2,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  getAllUserCtrl,
  getSingleUserCtrl,
};
