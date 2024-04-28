import React, { useEffect, useState } from "react";
import { getRequest } from "../../../apicalls/requests";
import ApprovedRequestCard from "./ApprovedRequestCard";
import RejectedRequestCard from "./RejectedRequestCard";
import "../../../StyleSheets/History.css";

const History = () => {
  const [allApproved, setAllApproved] = useState([]);
  const [allRejected, setAllRejected] = useState([]);
  const [approvedClicked, setApprovedClicked] = useState(true);
  const [rejectedClicked, setRejectedClicked] = useState(false);

  // fetching all request from backend
  const fetchAllRequest = async () => {
    try {
      const response = await getRequest();
      if (response.status === "success") {
        const approved = response.data.filter(
          (request) => request.status === "approved"
        );
        setAllApproved(approved);

        const rejected = response.data.filter(
          (request) => request.status === "rejected"
        );
        setAllRejected(rejected);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllRequest();
  }, [allApproved, allRejected]);

  return (
    <div>
      <div className="History-nav">
        <button
          onClick={() => {
            setApprovedClicked(true);
            setRejectedClicked(false);
          }}
        >
          Approved Requests
        </button>
        <button
          onClick={() => {
            setRejectedClicked(true);
            setApprovedClicked(false);
          }}
        >
          Rejected Requests
        </button>
      </div>
      {approvedClicked && (
        <div>
          {allApproved.map((request) => (
            <ApprovedRequestCard key={request._id} request={request} />
          ))}
        </div>
      )}
      {rejectedClicked && (
        <div>
          {allRejected.map((request) => (
            <RejectedRequestCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
