import React, { useEffect, useState } from "react";
import ApprovedCard from "./ApprovedCard";
import { GetLoggedInUserDetails } from "../../../apicalls/users";
import { message } from "antd";
import "../../../StyleSheets/ApprovedCard.css";

const ApprovedRequest = () => {
  const [approvedRequests, setApprovedRequest] = useState([]);
  const getAllApprovedRequest = () => {
    try {
      const response = GetLoggedInUserDetails();
      if (response.status === "success") {
        const approved = response.data.requests.filter((request) => {
          return request.status === "approved";
        });
        setApprovedRequest(approved);
      } else {
        message.error("fetching failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getAllApprovedRequest();
  }, []);
  return (
    <div>
      {approvedRequests.map((request) => (
        <ApprovedCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default ApprovedRequest;
