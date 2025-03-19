import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
   
  const API_URL = process.env.REACT_APP_API_URL;
  const response = await axios.get(`${API_URL}/check-room/${roomId}`);
  const joinRoom = () => {
    if (!username.trim() || !roomId.trim()) {
      alert("Please enter your name and a valid Room ID.");
      return;
    }
     try {
      // Call backend to verify the room exists
      const response = await axios.get(`${API_URL}/check-room/${roomId}`);

      if (response.data.exists) {
        navigate(`/whiteboard/${roomId}`); // Navigate if room exists
      } else {
        alert("Room not found. Please enter a valid Room ID.");
      }
    } catch (error) {
      console.error("Error joining room:", error);
      alert("Server error! Please try again.");
    }
   };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>JOIN ROOM</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter your name"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Room ID Input */}
        <input
          type="text"
          placeholder="Enter Room Code"
          style={styles.input}
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        {/* Join Room Button */}
        <button style={styles.mainButton} onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#6A1B9A",
  },
  formBox: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "4px 6px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000000",
    marginBottom: "20px",
  },
  input: {
    width: "90%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "center",
    backgroundColor: "#f7f7f7",
    outline: "none",
  },
  mainButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#000000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Join;
