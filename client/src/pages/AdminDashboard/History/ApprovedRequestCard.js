import React from "react";
import "../../../StyleSheets/ApprovedRequestCard.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "../../FacultyDashboard/PdfDownload";

const HistoryRequestCard = ({ request }) => {
  const { createdBy, dateRequested, Items } = request;
  return (
    <div className="approved-request-card">
      <h3>Faculty: {createdBy.username}</h3>
      <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
      <ul>
        {Items.map((item, index) => (
          <li key={index}>
            <span>Item Name: {item.item.itemName} </span>
            <span>Quantity Requested: {item.quantityRequested}</span>
            {item.quantityApproved !== 0 && (
              <span>Quantity Approved: {item.quantityApproved}</span>
            )}
          </li>
        ))}
      </ul>
      <PDFDownloadLink
        document={<PDFDocument Items={Items} />}
        fileName="userRequestDetail"
      >
        <button className="download-pdf">Download PDF</button>
      </PDFDownloadLink>
    </div>
  );
};

export default HistoryRequestCard;
