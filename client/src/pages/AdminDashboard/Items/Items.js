import React, { useState } from "react";
import { AddItem, GetAllItems } from "../../../apicalls/items";
import { Form, message } from "antd";
import ItemCard from "./ItemCard";
import("../../../StyleSheets/itemsCard.css");

const Items = ({userId}) => {
  const [showForm, setShowForm] = useState(false);
  const [allitems, setAllItems] = useState([]);

  // getting values on form submission and creating an api call in backend
  const onFinish = async (values) => {
    try {
      const response = await AddItem(values);
      if (response.status === "success") {
        message.success(response.message);
      } else {
        message.error("item creation failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // fetching All items from Backend
  const fetchAllItems = async () => {
    try {
      const response = await GetAllItems();
      if (response.status === "success") {
        const items = response.data;
        setAllItems(items);
        // message.success(response.message);
      } else {
        message.error("Items fetching failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  fetchAllItems();

  return (
    <div>
      <div className="items-display">
      <div className="Add-item-functionality">
        <button className="ADD_ITEM"
          onClick={() => {
            setShowForm(true);
          }}
        >
          +Add Item
        </button>
        {showForm && (
          <div className="Add-item-form">
            <div
              onClick={() => setShowForm(false)}
              className="form-wrapper"
            ></div>
            <div className="Form-container">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Item Name"
                  name="itemName"
                  rules={[
                    {
                      required: true,
                      message: "Please input ItemName",
                    },
                  ]}
                >
                  <input type="text" placeholder="itemName" />
                </Form.Item>

                <Form.Item
                  label="Available Quantity"
                  name="availableQuantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input Available Quantity",
                    },
                  ]}
                >
                  <input type="number" placeholder="Available Quantity" />
                </Form.Item>

                <Form.Item
                  label="Safe Deposit"
                  name="safeDeposit"
                  rules={[
                    {
                      required: true,
                      message: "Please input Safe Deposit",
                    },
                  ]}
                >
                  <input type="number" placeholder="Safe Deposite" />
                </Form.Item>

                <Form.Item
                  label="Type"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Please input type",
                    },
                  ]}
                >
                  <select>
                    <option disabled selected>
                      Select-type
                    </option>
                    <option>consumable</option>
                    <option>non-consumable</option>
                  </select>
                </Form.Item>

                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please input category of item",
                    },
                  ]}
                >
                  <select>
                    <option disabled selected>
                      Select-category
                    </option>
                    <option>Pen</option>
                    <option>Marker</option>
                    <option>File</option>
                    <option>Stapler</option>
                    <option>Paper Rim </option>
                    <option>Eraser</option>
                    <option>Pin</option>
                    <option>Remote Cell</option>
                    <option>Scissor</option>
                    <option>Cutter</option>
                    <option>inkPad</option>
                    <option>Punch Machine</option>
                    <option>Cellotap</option>
                    <option>Cartridge</option>
                    <option>Paper</option>
                    <option>Duster</option>
                    <option>Chalk</option>
                    <option>Marker</option>
                    <option>Clip</option>
                    <option>Files</option>
                    <option>Electronics</option>
                    <option>Fevicol</option>
                  </select>
                </Form.Item>

                <Form.Item label="Expiry Date" name="expiryDate">
                  <input type="date" placeholder="expiryDate" />
                </Form.Item>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>
      <div className="Search-item">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      </div>
      <div className="Item-card-value-heading">
        <div>
          <h5>Item Name</h5>
        </div>
        <div>
          <h5>Available Quantity</h5>
        </div>
        <div>
          <h5>Safety Stock</h5>
        </div>
        <div>
          <h5>Category</h5>
        </div>
        <div>
          <h5>Expiry Date</h5>
        </div>
        <div>
          <h5>Type</h5>
        </div>
        <div>
          <h5>Action</h5>
        </div>
      </div>

      <div className="Item-cards">
        {allitems.map((item) => (
          <ItemCard key={item._id} item={item} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Items;
