import React from "react";
import "../../../StyleSheets/RejectedRequestCard.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "../../FacultyDashboard/PdfDownload";

const RejectedRequestCard = ({ request }) => {
  const { createdBy, dateRequested, Items, message } = request;
  return (
    <div className="rejected-request-card">
      <div>
        <h3> {createdBy.username}</h3>
        <h5>{createdBy.designation}</h5>
      </div>
      <div>
        <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
        <p>Time : {new Date(dateRequested).toLocaleTimeString()}</p>
      </div>
      <div className="rejected-request-card-items-content">
        <div className="rejected-request-card-item-header">
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
        <div className="rejected-request-items-content">
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
      <div>
        <span>Reason : {message}</span>
      </div>
      <div className="rejected-request-card-action-container">
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

export default RejectedRequestCard;
