import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { PDFDocument } from "../PdfDownload";
import "../../../StyleSheets/PendingCard.css";

const PendingCard = ({ request ,userDetails }) => {
  const { dateRequested, Items, createdBy } = request;
  return (
    <div className="pending-request-card">
      <div>
        <h3> {userDetails?.username}</h3>
        <h5>{userDetails?.designation}</h5>
      </div>
      <div>
        <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
        <p>Time : {new Date(dateRequested).toLocaleTimeString()}</p>
      </div>
      <div className="pending-request-card-items-content">
        <div className="pending-request-card-item-header">
          <div>
            <span>Item Name</span>
          </div>
          <div>
            <span>Quantity Requested</span>
          </div>
        </div>
        <div className="pending-request-items-content">
          <ul>
            {Items.map((item, index) => (
              <li key={index}>
                <div>
                  <span>{item.item.itemName} </span>
                </div>
                <div>
                  <span>{item.quantityRequested}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pending-request-card-action-container">
        <PDFDownloadLink
          document={<PDFDocument Items={Items} />}
          fileName="userRequestDetail"
        >
          <button className="download-pdf">Download PDF</button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PendingCard;
