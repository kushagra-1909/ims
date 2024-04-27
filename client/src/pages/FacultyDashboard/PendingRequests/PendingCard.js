import React from "react";

const PendingCard = ({ request }) => {
  const { dateRequested, Items } = request;
  return (
    <div className="pending-request-card">
      <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
      <ul>
        {Items.map((item, index) => (
          <li key={index}>
            <span>Item Name: {item.item.itemName} </span>
            <span>Quantity: {item.quantityRequested}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingCard;
