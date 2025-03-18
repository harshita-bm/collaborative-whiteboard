import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Inline styles (unchanged)
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5", // Light gray background
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#1e3a8a", // Dark blue
    marginBottom: "30px",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px", // Space between buttons
  };

  const buttonStyle = {
    width: "250px",
    padding: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#2563eb", // Blue background
    border: "none",
    borderRadius: "10px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out, transform 0.2s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1e40af", // Darker blue
    transform: "scale(1.05)",
  };

  return (
    <div style={containerStyle}>
      {/* Title */}
      <h1 style={titleStyle}>Collaborative Whiteboard</h1>

      {/* Button Container */}
      <div style={buttonContainerStyle}>
        {/* Create Room Button */}
        <button
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/home")} // Navigate to Home.js
        >
          Create Room
        </button>

        {/* Join Room Button */}
        <button
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/join")} // Navigate to Join.js
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
