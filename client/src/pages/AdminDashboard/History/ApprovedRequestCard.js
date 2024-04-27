import React from "react";
import "../../../StyleSheets/ApprovedRequestCard.css";
const HistoryRequestCard = ({ request }) => {
  const { _id, createdBy, dateRequested, Items } = request;
  return (
    <div className="approved-request-card">
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
    </div>
  );
};

export default HistoryRequestCard;
