import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { getOrders } from "../../../apicalls/orders";
import { OrderHistory } from "./OrderHistory";
import { Cart } from "./Cart";

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
  },[]);

  return (
    <>
      <button onClick={()=>(setActiveSection("cart"))}>cart</button>
      <button onClick={()=>(setActiveSection("history"))}>order history</button>

      {activeSection === "cart" && <Cart orders={order} setOrder={setOrder}/>}
      {activeSection === "history" && <OrderHistory orders={order}/>}

      
    </>
  );
};

export default Orders;
