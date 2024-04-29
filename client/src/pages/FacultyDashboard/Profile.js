import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, GetLoggedInUserDetails } from "../../apicalls/users";
import { message } from "antd";
import "../../StyleSheets/profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  // Update formData when userDetails changes
  useEffect(() => {
    setFormData({
      username: userDetails.username || "",
      email: userDetails.email || "",
      department: userDetails.department || "",
    });
  }, [userDetails]);

  const handleShowAdditionalInputs = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUser(userDetails._id, formData);
    try {
      if (response.status === "success") {
        message.success(response.message);
        if (response.message2) {
          message.success(response.message2);
        } else {
          message.error("enter correct old password");
        }
      } else {
        message.error("Error in API call");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <div className="profile-alignment">
        <div>
          <h1>Profile</h1>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <p>Department: {userDetails.department}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-elements">
            <div>
              <label htmlFor="username">Name:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            <div className="change-password">
              <button onClick={handleShowAdditionalInputs} type="button">
                Change Password
              </button>
            </div>
            {showAdditionalInputs && (
              <>
                <div>
                  <label htmlFor="old_password">Old Password:</label>
                  <input
                    type="password"
                    id="old_password"
                    name="old_password"
                    onChange={handleChange}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                </div>
                <div>
                  <label htmlFor="new_password">New Password:</label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="more-buttons">
              <button
                className="back-button"
                onClick={() => navigate(-1)}
                type="button"
              >
                Back
              </button>
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
