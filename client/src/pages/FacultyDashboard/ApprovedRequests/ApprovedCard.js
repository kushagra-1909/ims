import React from "react";

const ApprovedCard = ({ request }) => {
  const { dateRequested, Items } = request;
  return (
    <div className="request-card">
      <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
      <p>Time: {new Date(dateRequested).toLocaleTimeString()}</p>
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

export default ApprovedCard;
