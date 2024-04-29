import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
export const OrderHistory = ({ orders }) => {
  return (
    <>
      <h1>Order History</h1>
      {orders.length > 0 && (
        <div>
          {orders.map(
            (order) =>
              order.status === "placed" && (
                <div key={order._id}>
                  <h3>supplier Email: {order.supplierEmail}</h3>
                  <p>Status: {order.status}</p>
                  <ul>
                    {order.Items.map((item) => (
                      <li key={item._id}>
                        ItemName: {item.itemId.itemName} - Quantity:{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};
