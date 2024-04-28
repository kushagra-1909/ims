import React from "react";
import "../../../StyleSheets/RejectedRequestCard.css";
const RejectedRequestCard = ({ request }) => {
  const { _id, createdBy, dateRequested, Items, message } = request;
  return (
    <div className="rejected-request-card">
      <h3>Faculty: {createdBy.username}</h3>
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
      <button>Generate PDF</button>
    </div>
  );
};

export default RejectedRequestCard;
