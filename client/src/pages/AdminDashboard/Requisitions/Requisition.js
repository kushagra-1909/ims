import React from "react";
import { useState, useEffect } from "react";
import { getRequest } from "../../../apicalls/requests";
import { message } from "antd";
import RequestCard from "./RequestCard";
import "../../../StyleSheets/RequestCard.css";

const Requisition = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  // Getting all requests from backend
  const GetRequestsResponse = async () => {
    try {
      const response = await getRequest();
      if (response.status === "success") {
        const pending = response.data.filter(
          (request) => request.status === "pending"
        );
        setPendingRequests(pending);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    GetRequestsResponse();
  }, [pendingRequests]);

  return (
    <div className="requisition-color">
      <h2>Pending Requests</h2>
      {pendingRequests.map((request) => (
        <RequestCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default Requisition;
