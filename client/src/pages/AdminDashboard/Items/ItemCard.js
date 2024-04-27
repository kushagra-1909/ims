import React, { useState } from "react";
import { Form, message } from "antd";
import { DeleteItem, UpdateItem } from "../../../apicalls/items";

const ItemCard = ({ item }) => {
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

  const placeOrder = async (values) => {};

  return (
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
        {showEditForm && (
          <div className="Edit-item-form">
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
                <button
                  onClick={() => {
                    setShowEditForm(false);
                  }}
                >
                  close
                </button>
              </div>
            </Form>
          </div>
        )}
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
            {showPlaceOrderForm && (
              <div className="Place-order-form">
                <Form layout="vertical" onFinish={placeOrder}>
                  <Form.Item
                    label="Supplier Firm Name"
                    name="supplierName"
                    rules={[
                      {
                        required: true,
                        message: "Please input supplier firm name",
                      },
                    ]}
                  >
                    <input type="text" placeholder="Supplier name" />
                  </Form.Item>

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
                    <button type="submit">Place Order</button>
                    <button
                      onClick={() => {
                        setShowPlaceOrderForm(false);
                      }}
                    >
                      close
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
