import React from "react";
export const OrderHistory = ({ orders }) => {
  return (
    <div className="order-content">
      <h1>Order History</h1>
      {orders.length > 0 && (
        <div>
          {orders.map(
            (order) =>
              order.status === "placed" && (
                <div key={order._id} className="order-detail-container">
                  <div>
                    <h3>supplier Email: {order.supplierEmail}</h3>
                  </div>
                  <div>
                    <p>Status: {order.status}</p>
                  </div>
                  <div className="order-item-list">
                    <div className="order-item-detail">
                      <div>ItemName</div>
                      <div>Quantity</div>
                    </div>
                    <ul>
                      {order.Items.map((item) => (
                        <li key={item._id}>
                          <div className="itemname-quantity-details">
                            <div>{item.itemId.itemName}</div>
                            <div>{item.quantity}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
