import React, { useEffect, useState } from "react";
import Requisition from "./Requisitions/Requisition";
import Items from "./Items/Items";
import Users from "./Users/Users";
import History from "./History/History";
import Orders from "./Orders/Orders";
import "../../StyleSheets/Items.css";
import "../../StyleSheets/Users.css";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "../../apicalls/users";
import { message } from "antd";
import { ProfileButton } from "../FacultyDashboard/ProfileButton";

const AdminDashboard = () => {
  // State variable to manage active section
  const [activeSection, setActiveSection] = useState("requisition");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
    fetchLoginUserDetails();
  }, []);

  return (
    <div className="background-admin">
      <div>
        <div className="Admin-dashboard-header">
          <h1>Welcome {userDetails.username}</h1>
          <div>
            <ProfileButton userDetails={userDetails} />
          </div>
        </div>
        <div className="adminDashboardNav">
          <button
            className="requisition-button"
            onClick={() => setActiveSection("requisition")}
          >
            Requisitions
          </button>
          <button onClick={() => setActiveSection("items")}>Items</button>
          <button onClick={() => setActiveSection("users")}>Users</button>
          <button onClick={() => setActiveSection("history")}>History</button>
          <button onClick={() => setActiveSection("orders")}>Orders</button>
        </div>
        {activeSection === "requisition" && <Requisition />}
        {activeSection === "items" && <Items userId={userDetails._id}/>}
        {activeSection === "users" && <Users />}
        {activeSection === "history" && <History />}
        {activeSection === "orders" && <Orders userDetails={userDetails}/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
