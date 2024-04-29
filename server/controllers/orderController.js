const Order = require("../model/Order");
const appErr = require("../utils/appErr");

const createOrder = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userId, itemId, quantity } = req.body;
    console.log(userId, itemId, quantity);
    let order = await Order.findOne({ createdBy: userId, status: "pending" });
    if (order == null) {
      console.log("order created!!");
      order = await Order.create({
        Items: {
          itemId: itemId,
          quantity: quantity,
        },
        createdBy: userId,
      });
    } else {
      order.Items.push({
        itemId: itemId,
        quantity: quantity,
      });
    }
    console.log("order:", order);
    await order.save();
    res.json({
      status: "success",
      order: order,
      message: " order add successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getOrdersCtrl = async (req, res, next) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const orders = await Order.find({ createdBy: id }).populate({
      path: "Items.itemId",
    });
    res.json({
      status: "success",
      data: orders,
      message: "orders fetched successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const placeOrder = async (req, res, next) => {
  try {
    
    const { id } = req.params;
    const {supplierEmail}= req.body;
    let orders = await Order.findById(id).populate({
      path: "Items.itemId",
    });
    orders.status= "placed";
    orders.supplierEmail= supplierEmail;
    await orders.save();
    res.json({
      status: "success",
      message: "orders placed successfully",
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createOrder,
  getOrdersCtrl,
  placeOrder,
};
