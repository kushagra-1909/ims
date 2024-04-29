import React, { useState } from "react";
import { Form, message } from "antd";
import { DeleteItem, UpdateItem } from "../../../apicalls/items";
import {addToCart} from "../../../apicalls/orders"

const ItemCard = ({ item, userId }) => {
  const {
    _id,
    itemName,
    availableQuantity,
    safeDeposit,
    category,
    expiryDate,
    type,
  } = item;

  const [showEditForm, setShowEditForm] = useState(false);
  const [showPlaceOrderForm, setShowPlaceOrderForm] = useState(false);

  const onFinish = async (values) => {
    const response = await UpdateItem(_id, values);
    try {
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("Update item failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // delete api calling from backend
  const handleDeleteItem = async () => {
    const response = await DeleteItem(_id);
    try {
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("delete failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const AddToCart= async (values)=>{
    
    const payload= {userId: userId, itemId: _id, quantity: values.quantity};
    console.log("payload",payload);
    try {
      const response = await addToCart(payload);
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("item add failed!!");
      }
    } catch (error) {
      message.error(error.message);
    }
    setShowPlaceOrderForm(false);
  }

  return (
    <div>
      <div className="Item-card">
        <div>
          <h5>{itemName}</h5>
        </div>
        <div>
          <h5>{availableQuantity}</h5>
        </div>
        <div>
          <h5>{safeDeposit}</h5>
        </div>
        <div>
          <h5>{category}</h5>
        </div>
        <div>
          <h5>{expiryDate}</h5>
        </div>
        <div>
          <h5>{type}</h5>
        </div>
        <div>
          <button
            onClick={() => {
              setShowEditForm(true);
            }}
          >
            Edit
          </button>
          <button onClick={handleDeleteItem}>Delete</button>
          {availableQuantity <= safeDeposit && (
            <div className="item-card-place-order">
              <button
                onClick={() => {
                  setShowPlaceOrderForm(true);
                }}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
      {showEditForm && (
        <div>
          <div
            onClick={() => {
              setShowEditForm(false);
            }}
            className="Edit-item-form-wrapper"
          ></div>
          <div className="Edit-item-form-container">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Item Name" name="itemName">
                <input type="text" placeholder="itemName" />
              </Form.Item>

              <Form.Item label="Available Quantity" name="availableQuantity">
                <input type="number" placeholder="Available Quantity" />
              </Form.Item>

              <Form.Item label="Safe Deposit" name="safeDeposit">
                <input type="number" placeholder="Safe Deposite" />
              </Form.Item>

              <Form.Item label="Type" name="type">
                <select>
                  <option disabled selected>
                    Select-type
                  </option>
                  <option>consumable</option>
                  <option>non-consumable</option>
                </select>
              </Form.Item>

              <Form.Item label="Category" name="category">
                <select>
                  <option disabled selected>
                    Select-category
                  </option>
                  <option>Pen</option>
                  <option>Marker</option>
                  <option>File</option>
                  <option>Stapler</option>
                  <option>Paper Rim Size</option>
                </select>
              </Form.Item>

              <Form.Item label="Expiry Date" name="expiryDate">
                <input type="date" placeholder="expiryDate" />
              </Form.Item>
              <div>
                <button type="submit">Update Item</button>
              </div>
            </Form>
          </div>
        </div>
      )}
      {showPlaceOrderForm && (
        <div>
          <div
            onClick={() => {
              setShowPlaceOrderForm(false);
            }}
            className="place-order-wrapper"
          ></div>
          <div className="place-order-container">
            <Form layout="vertical" onFinish={AddToCart}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input quantity of item",
                  },
                ]}
              >
                <input type="number" placeholder="quantity" />
              </Form.Item>
              <div>
                <button type="submit">Add to Cart</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
