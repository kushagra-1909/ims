import React from "react";
import "../../../StyleSheets/RejectedRequestCard.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "../../FacultyDashboard/PdfDownload";

const RejectedRequestCard = ({ request }) => {
  const { createdBy, dateRequested, Items, message } = request;
  return (
    <div className="rejected-request-card">
      <h3>Faculty: {createdBy.username}</h3>
      <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
      <ul>
        {Items.map((item, index) => (
          <li key={index}>
            <span>Item Name: {item.item.itemName} </span>
            <span>Quantity Requested: {item.quantityRequested}</span>
          </li>
        ))}
      </ul>
      <p>Reason : {message}</p>
      <PDFDownloadLink
        document={<PDFDocument Items={Items} />}
        fileName="userRequestDetail"
      >
        <button className="download-pdf">Download PDF</button>
      </PDFDownloadLink>
    </div>
  );
};

export default RejectedRequestCard;
