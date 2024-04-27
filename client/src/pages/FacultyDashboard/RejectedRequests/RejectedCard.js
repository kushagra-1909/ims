import React from "react";

const RejectedCard = ({ request }) => {
  const { dateRequested, Items, message } = request;
  return (
    <div className="request-card">
      <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
      <ul>
        {Items.map((item, index) => (
          <li key={index}>
            <span>Item Name: {item.item.itemName} </span>
            <span>Quantity: {item.quantityRequested}</span>
          </li>
        ))}
      </ul>
      <p>Reason : {message}</p>
    </div>
  );
};

export default RejectedCard;
