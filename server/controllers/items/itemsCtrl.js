const Item = require("../../model/Item");
const appErr = require("../../utils/appErr");

//create
const createItemCtrl = async (req, res, next) => {
  const {
    itemName,
    availableQuantity,
    safeDeposit,
    type,
    category,
    expiryDate,
  } = req.body;
  try {
    const item = await Item.create({
      itemName,
      availableQuantity,
      safeDeposit,
      type,
      category,
      expiryDate,
      createdBy: req.user,
    });
    res.json({
      status: "success",
      message: "item added successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//all
const getItemsCtrl = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.json({
      status: "success",
      data: items,
      message: "Items fetched successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//single
const getItemCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.json({
      status: "success",
      data: item,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//delete
const deleteItemCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
      message: "Item deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//update
const updateItemCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: item,
      message: "item updated successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createItemCtrl,
  getItemsCtrl,
  deleteItemCtrl,
  updateItemCtrl,
  getItemCtrl,
};
