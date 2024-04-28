import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { PDFDocument } from "./PdfDownload";

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
            <span>Quantity Requested: {item.quantityRequested}</span>
            <span>Quantity Approved: {item.quantityApproved}</span>
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

export default ApprovedCard;
