// RequestCard.js
import React, { useState } from "react";
import {
  editRequest,
  partialApproveRequest,
  partialDeclineRequest,
} from "../../../apicalls/requests";
import { message } from "antd";
import { UpdateItem } from "../../../apicalls/items";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "../../FacultyDashboard/PdfDownload";

const RequestCard = ({ request }) => {
  const { _id, createdBy, dateRequested, Items} = request;
  const [showDeclinedInput, setShowDeclinedInput] = useState(false);
  const [msg, setMsg] = useState("");
  const [requestItems, setRequestItems] = useState(Items);
  const [approvedQty, setApprovedQty] = useState(0);

  const handleApprove = async () => {
    try {
      // Update request status to "approved"
      await editRequest(_id, {
        status: "approved",
      });
      // Decrease item quantity in the database
      for (const item of Items) {
        if (item.quantityApproved === 0) {
          await UpdateItem(item.item._id, {
            availableQuantity:
              item.item.availableQuantity - item.quantityRequested,
          });
          await editRequest(_id, {
            [`Items.${Items.indexOf(item)}.quantityApproved`]:
              item.quantityRequested,
          });
        } else {
          await UpdateItem(item.item._id, {
            availableQuantity:
              item.item.availableQuantity - item.quantityApproved,
          });
        }
      }

      message.success("Request approved successfully");
    } catch (error) {
      message.error("Failed to approve request");
    }
  };

  const handleDecline = async () => {
    try {
      // Update request status to "rejected"
      await editRequest(_id, { status: "rejected", message: msg });
      message.success("Request declined successfully");
    } catch (error) {
      message.error("Failed to decline request");
    }
  };

  const partialDecline = async (index) => {
    try {
      const response = await partialDeclineRequest(_id, index);
      if (response === "success") {
        message.success("Item removed from request successfully");
      }
      const updatedItems = [...requestItems];
      updatedItems.splice(index, 1);
      setRequestItems(updatedItems);
    } catch (error) {
      message.error("Failed to remove item from request");
    }
  };

  const partialApprove = async (index, approvedQty) => {
    try {
      const response = await partialApproveRequest(
        _id,
        index,
        approvedQty,
        Items[index].quantityRequested
      );
      if (response === "success") {
        message.success(response.message);
      }
    } catch (error) {
      message.error("Failed to approve item from request");
    }
  };

  return (
    <div className="fullbackground">
      <div className="request-card">
        <div>
          <h3> {createdBy.username}</h3>
          <h5>{createdBy.designation}</h5>
        </div>
        <div>
          <p>Date: {new Date(dateRequested).toLocaleDateString()}</p>
          <p>Time : {new Date(dateRequested).toLocaleTimeString()}</p>
        </div>
        <div className="request-item-container">
          <div className="request-item-details-header">
            <div>
              <span>Item Name</span>
            </div>
            <div>
              <span>Quantity Requested</span>
            </div>
            <div>
              <span>Available Quantity</span>
            </div>
            <div>
              <span>Safety stock</span>
            </div>
            <div>
              <span>Action</span>
            </div>
          </div>
          <div className="request-items-content">
            <ul>
              {Items.map((item, index) => (
                <li key={index}>
                  <div>
                    <span>{item.item.itemName} </span>
                  </div>
                  <div>
                    <span>{item.quantityRequested}</span>
                    {item.item.availableQuantity - item.quantityRequested <
                      item.item.safeDeposit && (
                      <input
                        type="number"
                        placeholder="Qty"
                        onChange={(e) => {
                          setApprovedQty(e.target.value);
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <span>{item.item.availableQuantity}</span>
                  </div>
                  <div>
                    <span>{item.item.safeDeposit}</span>
                  </div>
                  <div className="request-item-content-buttons">
                    {item.item.availableQuantity - item.quantityRequested <
                      item.item.safeDeposit && (
                      <button
                        onClick={() => {
                          partialApprove(index, approvedQty);
                        }}
                      >
                        ✅
                      </button>
                    )}
                    <button onClick={() => partialDecline(index)}>❌</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="action">
          <div>
            <button onClick={handleApprove} className="approve-btn">
              Approve
            </button>

            <button
              onClick={() => {
                setShowDeclinedInput(true);
              }}
              className="decline-btn"
            >
              Decline
            </button>
          </div>

          <div className="generate-pdf-button">
            <PDFDownloadLink
              document={<PDFDocument Items={Items} />}
              fileName="userRequestDetail"
            >
              <button className="download-pdf">Download PDF</button>
            </PDFDownloadLink>
          </div>

          {showDeclinedInput && (
            <div>
              <div
                onClick={() => {
                  setShowDeclinedInput(false);
                }}
                className="decline-request-wrapper"
              ></div>
              <div className="decline-request-container">
                <input
                  type="text"
                  placeholder="type message"
                  onChange={(e) => setMsg(e.target.value)}
                  required
                />
                <div>
                  <button type="submit" onClick={handleDecline}>
                    send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
