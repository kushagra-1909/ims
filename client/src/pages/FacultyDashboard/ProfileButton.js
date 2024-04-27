import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileButton = ({ userDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  // console.log("button:", userDetails)
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const profile = () => {
    navigate("profile");
    // <Profile/>
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button style={{ padding: "10px", border: "none", background: "none" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-BrdbGxS7N5p12BWlJipkahd_O0eN0Ejz9vtmvHR5w&s"
          alt="Profile"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      </button>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "-120px", // Adjust the left position as needed
            zIndex: "9999", // Ensure the menu appears on top
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            padding: "10px",
          }}
        >
          <button
            style={{ display: "block", marginBottom: "5px" }}
            onClick={profile}
          >
            View Profile
          </button>
          <button style={{ display: "block" }} onClick={logout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
