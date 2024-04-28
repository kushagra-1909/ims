const Request = require("../../model/Request");
const User = require("../../model/User");
const appErr = require("../../utils/appErr");

//create
const createRequestCtrl = async (req, res, next) => {
  const Items = req.body;
  try {
    // 1. find the logged in user
    const userFound = await User.findById(req.user);
    if (!userFound) return next(appErr("User not found", 404));
    // 2. create the request
    const request = await Request.create({
      Items,
      createdBy: req.user,
    });
    // 3. push the request into the users request field
    userFound.requests.push(request._id);
    // 4. resave the user
    await userFound.save();

    res.json({
      status: "success",
      data: request,
      message: "Request Sent Successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//all
const getRequestsCtrl = async (req, res, next) => {
  try {
    const requests = await Request.find({})
      .populate("createdBy", "-password")
      .populate("Items.item");
    res.json({
      status: "success",
      data: requests,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//single
const getRequestCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    res.json({
      status: "success",
      data: request,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//delete
const deleteRequestCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Request.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//update
const updateRequestCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: request,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const partialDeclineRequestCtrl = async (req, res, next) => {
  try {
    const { requestId, itemIndex } = req.body;

    // Find the request by ID
    const request = await Request.findById(requestId);
    if (!request) {
      return next(appErr("Request not found", 404));
    }

    // Remove the item from the request
    request.Items.splice(itemIndex, 1);

    // Save the updated request
    await request.save();

    res.status(200).json({
      status: "success",
      message: "Item removed from request successfully",
      data: request,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const partialApproveRequestCtrl = async (req, res, next) => {
  try {
    const { requestId, itemIndex, approvedQty, quantityRequested } = req.body;

    // Find the request by ID
    const request = await Request.findById(requestId);
    if (!request) {
      return next(appErr("Request not found", 404));
    }

    if (approvedQty === 0) {
      request.Items[itemIndex].quantityApproved = quantityRequested;
    } else {
      request.Items[itemIndex].quantityApproved = approvedQty;
    }

    // Save the updated request
    await request.save();

    res.status(200).json({
      status: "success",
      message: "Item quantity changed in request successfully",
      data: request,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createRequestCtrl,
  getRequestsCtrl,
  deleteRequestCtrl,
  updateRequestCtrl,
  getRequestCtrl,
  partialDeclineRequestCtrl,
  partialApproveRequestCtrl,
};
