import React, { useEffect, useState } from "react";
import CreateNewRequest from "./CreateNewRequest/CreateNewRequest";

import "../../StyleSheets/CreateNewRequest.css";
import { GetLoggedInUserDetails } from "../../apicalls/users";
import { message } from "antd";
import PendingCard from "./PendingRequests/PendingCard";
import RejectedCard from "./RejectedRequests/RejectedCard";
import ApprovedCard from "./ApprovedRequests/ApprovedCard";
import { ProfileButton } from "./ProfileButton";

const FacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState("CreateNewRequest");
  const [userDetails, setUserDetails] = useState({});
  const [request, setRequest] = useState({});

  //   const { data: userDetailsT, isLoading: userDetailsLoading } = useQuery({
  //     key: PLATFORM_ENDPOINTS.lastRanJobStatus,
  //     dependency: {
  //       adAccount: true
  //     },
  //     queryFn: async () => {
  //       const { data = {} } = await Service.getLastRanJobStatus();
  //       return data;
  //     }
  //   });

  // get Logged In user deatils
  const fetchLoginUserDetails = async () => {
    try {
      const response = await GetLoggedInUserDetails();
      if (response.status === "success") {
        const user = response.data;
        setUserDetails(user);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const pendingReq = userDetails?.requests?.filter(
      (request) => request.status === "pending"
    );
    const approvedReq = userDetails?.requests?.filter(
      (request) => request.status === "approved"
    );
    const rejectedReq = userDetails?.requests?.filter(
      (request) => request.status === "rejected"
    );
    setRequest({
      pending: pendingReq,
      approved: approvedReq,
      rejected: rejectedReq,
    });
  }, [userDetails]);

  useEffect(() => {
    fetchLoginUserDetails();
  }, []);

  return (
    <div>
      <div className="faculty-dashboard-header">
        <h1>Welcome {userDetails.username}</h1>
        <div>
          <ProfileButton userDetails={userDetails} />
        </div>
      </div>
      <div className="status-bar">
        <CreateNewRequest />
        <h1>Request Status</h1>
        <div className="Request-status-nav">
          <button
            className="Pending"
            onClick={() => setActiveSection("PendingRequest")}
          >
            Pending
          </button>

          <button
            className="Approved"
            onClick={() => setActiveSection("ApprovedRequest")}
          >
            Approved
          </button>

          <button
            className="Rejected"
            onClick={() => setActiveSection("RejectedRequest")}
          >
            Rejected
          </button>
        </div>
      </div>
      {activeSection === "PendingRequest" && (
        <div>
          {request?.pending.map((request) => (
            <PendingCard key={request._id} request={request} userDetails= {userDetails}/>
          ))}
        </div>
      )}
      {activeSection === "ApprovedRequest" && (
        <div>
          {request?.approved.map((request) => (
            <ApprovedCard key={request._id} request={request} userDetails= {userDetails}/>
          ))}
        </div>
      )}
      {activeSection === "RejectedRequest" && (
        <div>
          {request?.rejected.map((request) => (
            <RejectedCard key={request._id} request={request} userDetails= {userDetails}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
