import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { PlaceOrder } from "../../../apicalls/orders";

export const Cart = ({ orders, setOrder }) => {
  const placeOrder = async (id, val) => {
    console.log("id:", id);
    const payload = { supplierEmail: val.email };
    console.log("val:", payload);
    try {
      const response = await PlaceOrder(id, payload);
      if (response.status === "success") {
        message.success(response.message);
        message.success("email sent successfully");
      } else {
        message.error("orders can't placed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <h1>Cart</h1>
      {orders.length > 0 && (
        <div>
          {orders.map(
            (order) =>
              order.status === "pending" && (
                <div key={order._id}>
                  <p>Status: {order.status}</p>
                  <ul>
                    {order.Items.map((item) => (
                      <li key={item._id}>
                        ItemName: {item.itemId.itemName} - Quantity:{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <Form
                    layout="vertical"
                    onFinish={(val) => {
                      placeOrder(order._id, val);
                    }}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email address",
                          type: "email", // This ensures that the input value is a valid email address
                        },
                      ]}
                    >
                      <input type="email" placeholder="Email" />
                    </Form.Item>

                    <Form.Item>
                      <button type="submit">Place Order</button>
                    </Form.Item>
                  </Form>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};
