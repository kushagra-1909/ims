import React, { useEffect, useState } from "react";
import RejectedCard from "./RejectedCard";
import { GetLoggedInUserDetails } from "../../../apicalls/users";
import { message } from "antd";
import "../../../StyleSheets/RejectedCard.css";

const RejectedRequest = () => {
  const [rejectedRequests, setRejectedRequest] = useState([]);
  const getAllRejectedRequest = () => {
    try {
      const response = GetLoggedInUserDetails();
      if (response.status === "success") {
        const rejected = response.data.requests.filter((request) => {
          return request.status === "rejected";
        });
        setRejectedRequest(rejected);
      } else {
        message.error("fetching failed");
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getAllRejectedRequest();
  }, []);
  return (
    <div>
      {rejectedRequests.map((request) => (
        <RejectedCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default RejectedRequest;
