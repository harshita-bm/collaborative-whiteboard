import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported

const Join = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Make the function async
  const joinRoom = async () => {
    if (!username.trim() || !roomId.trim()) {
      alert("Please enter your name and a valid Room ID.");
      return;
    }

    try {
      // ✅ Await inside the async function
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

        <input
          type="text"
          placeholder="Enter your name"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Room Code"
          style={styles.input}
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button style={styles.mainButton} onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Join;
