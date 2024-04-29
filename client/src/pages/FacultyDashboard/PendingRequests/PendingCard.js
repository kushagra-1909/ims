import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { PDFDocument } from "../PdfDownload";
import "../../../StyleSheets/PendingCard.css";

const PendingCard = ({ request }) => {
  const { dateRequested, Items } = request;
  return (
    <div className="pending-request-card">
      <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
      <ul>
        {Items.map((item, index) => (
          <li key={index}>
            <span>Item Name: {item.item.itemName} </span>
            <span>Quantity: {item.quantityRequested}</span>
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

export default PendingCard;
