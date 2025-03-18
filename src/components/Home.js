import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

const Home = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  // Function to generate a unique Room ID
  const createRoom = () => {
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }
    const newRoomId = uuidv4(); // Generate unique ID
    setRoomId(newRoomId);
  };

  // Function to copy Room ID
  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      alert("Room ID copied!");
    }
  };

  // Function to navigate to the Whiteboard
  const goToRoom = () => {
    if (!roomId.trim()) {
      alert("Generate a Room ID first!");
      return;
    }
    navigate(`/whiteboard/${roomId}`); // ✅ Redirect to Whiteboard.js
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>CREATE ROOM</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter your name"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Room ID Field */}
        <input
          type="text"
          placeholder="Generated Room ID"
          style={styles.input}
          value={roomId}
          readOnly
        />

        {/* Buttons: Generate & Copy Room ID */}
        <div style={styles.buttonGroup}>
          <button style={styles.smallButton} onClick={createRoom}>
            Generate
          </button>
          <button style={styles.smallButton} onClick={copyRoomId}>
            Copy
          </button>
        </div>

        {/* Join Room Button */}
        <button style={styles.mainButton} onClick={goToRoom} disabled={!roomId}>
          Create Room
        </button>
      </div>
    </div>
  );
};

// Styles (Unchanged)
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
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  smallButton: {
    width: "48%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#000000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
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

export default Home;
