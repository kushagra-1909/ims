import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { PDFDocument } from "../PdfDownload";

const RejectedCard = ({ request }) => {
  const { dateRequested, Items, message } = request;
  return (
    <div className="request-card">
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
      <PDFDownloadLink
        document={<PDFDocument Items={Items} />}
        fileName="userRequestDetail"
      >
        <button className="download-pdf">Download PDF</button>
      </PDFDownloadLink>
    </div>
  );
};

export default RejectedCard;
