import React from "react";
import "../../../StyleSheets/ApprovedRequestCard.css";
const HistoryRequestCard = ({ request }) => {
  const { createdBy, dateRequested, Items } = request;
  return (
    <div className="approved-request-card">
      <div>
        <h3> {createdBy.username}</h3>
        <h5>{createdBy.designation}</h5>
      </div>
      <div>
        <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
        <p>Time : {new Date(dateRequested).toLocaleTimeString()}</p>
      </div>
      <div className="approved-request-card-items-content">
        <div className="approved-request-card-item-header">
            <div>
              <span>Item Name</span>
            </div>
            <div>
              <span>Quantity Requested</span>
            </div>
            <div>
              <span>Quantity Approved</span>
            </div>
        </div>
        <div className="approved-request-items-content">
            <ul>
              {Items.map((item, index) => (
                <li key={index}>
                  <div>
                    <span>{item.item.itemName} </span>
                  </div>
                  <div>
                    <span>{item.quantityRequested}</span>
                  </div>
                  <div>
                    <span>{item.quantityApproved}</span>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoryRequestCard;
