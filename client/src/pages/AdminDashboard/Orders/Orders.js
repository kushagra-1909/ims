import React, { useState, useEffect } from "react";
import { message } from "antd";
import { getOrders } from "../../../apicalls/orders";
import { OrderHistory } from "./OrderHistory";
import { Cart } from "./Cart";
import "../../../StyleSheets/OrderHistory.css";
import "../../../StyleSheets/Cart.css";

const Orders = ({ userDetails }) => {
  const [order, setOrder] = useState([]);
  const [activeSection, setActiveSection] = useState("cart");

  const AllOrders = async () => {
    const response = await getOrders(userDetails._id);
    try {
      if (response.status === "success") {
        setOrder(response.data);
        // message.success(response.message);
      } else {
        message.error("orders can't get");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    AllOrders();
  }, []);
  useEffect(() => {
    setOrder(order);
  }, []);

  return (
    <div className="order-header">
      <button onClick={() => setActiveSection("cart")}>cart</button>
      <button onClick={() => setActiveSection("history")}>order history</button>
      {activeSection === "cart" && <Cart orders={order} setOrder={setOrder} />}
      {activeSection === "history" && <OrderHistory orders={order} />}
    </div>
  );
};

export default Orders;
