import React, { useEffect } from "react";
import PendingCard from "./PendingCard";
import "../../../StyleSheets/PendingCard.css";

const PendingRequest = ({ userDetails }) => {
  // fetch all requests created by user
  const pendingRequests = userDetails.requests.filter(
    (request) => request.status === "pending"
  );

  useEffect(() => {}, [pendingRequests]);
  return (
    <div>
      {pendingRequests.map((request) => (
        <PendingCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default PendingRequest;
