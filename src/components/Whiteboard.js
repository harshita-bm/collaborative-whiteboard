import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Whiteboard = () => {
  const { roomId } = useParams();
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(10);
  const [isErasing, setIsErasing] = useState(false);
  const [textBoxes, setTextBoxes] = useState([]);
  const [postIts, setPostIts] = useState([]);
  const [images, setImages] = useState([]);
  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctxRef.current = ctx;

    socket.emit("joinRoom", roomId);
    socket.on("loadCanvas", (canvasData) => {
      if (canvasData) loadCanvas(canvasData);
    });

    return () => socket.disconnect();
  }, [roomId]);

  // ✅ FIXED: Added missing 'loadCanvas' function
  const loadCanvas = (data) => {
    const ctx = ctxRef.current;
    const img = new Image();
    img.src = data;
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const startDrawing = ({ nativeEvent }) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.strokeStyle = isErasing ? "white" : color;
    ctxRef.current.lineWidth = isErasing ? eraserSize : penSize;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const addTextBox = () => {
    setTextBoxes([...textBoxes, { id: Date.now(), x: 100, y: 100, text: "Enter text..." }]);
  };

  const addPostIt = (shape) => {
    setPostIts([...postIts, { id: Date.now(), x: 100, y: 100, shape }]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...images, { id: Date.now(), src: reader.result, x: 150, y: 150 }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />

      {textBoxes.map((box) => (
        <input
          key={box.id}
          value={box.text}
          onChange={(e) => setTextBoxes(textBoxes.map(t => t.id === box.id ? { ...t, text: e.target.value } : t))}
          style={{ position: "absolute", left: box.x, top: box.y, padding: "5px", border: "1px solid black", cursor: "move" }}
          draggable
        />
      ))}

      {postIts.map((post) => (
        <div
          key={post.id}
          style={{
            position: "absolute",
            left: post.x,
            top: post.y,
            width: "100px",
            height: "100px",
            backgroundColor: "yellow",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: post.shape === "circle" ? "50%" : "0",
            cursor: "move"
          }}
          draggable
        >
          Post-it
        </div>
      ))}

      <div style={styles.toolbar}>
        {/* Pen Tool */}
        <button onClick={() => setActiveTool(activeTool === "pen" ? null : "pen")}>🖊️</button>
        {activeTool === "pen" && (
          <div style={styles.popupToolbar}>
            <button onClick={() => { setPenSize(2); setIsErasing(false); }}>〰️ Small</button>
            <button onClick={() => { setPenSize(5); setIsErasing(false); }}>〰️ Medium</button>
            <button onClick={() => { setPenSize(10); setIsErasing(false); }}>〰️ Large</button>
          </div>
        )}

        {/* Color Picker */}
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={styles.colorPicker} />

        {/* Eraser Tool */}
        <button onClick={() => setActiveTool(activeTool === "eraser" ? null : "eraser")}>🧽</button>
        {activeTool === "eraser" && (
          <div style={styles.popupToolbar}>
            <button onClick={() => { setEraserSize(5); setIsErasing(true); }}>⚪ Small</button>
            <button onClick={() => { setEraserSize(10); setIsErasing(true); }}>⚪ Medium</button>
            <button onClick={() => { setEraserSize(15); setIsErasing(true); }}>⚪ Large</button>
          </div>
        )}

        {/* Post-it Notes */}
        <button onClick={() => setActiveTool(activeTool === "postit" ? null : "postit")}>🟨</button>
        {activeTool === "postit" && (
          <div style={styles.popupToolbar}>
            <button onClick={() => addPostIt("square")}>🟨 Square</button>
            <button onClick={() => addPostIt("circle")}>🔵 Circle</button>
          </div>
        )}

        {/* Text Box */}
        <button onClick={addTextBox}>T</button>

        {/* Image Upload */}
        <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="fileInput" />
        <button onClick={() => document.getElementById("fileInput").click()}>📂</button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f0f0f0" },
  canvas: { border: "2px solid black", backgroundColor: "white" },
  toolbar: { display: "flex", gap: "10px", position: "absolute", bottom: "10px", backgroundColor: "#fff", borderRadius: "10px", padding: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
  popupToolbar: { position: "absolute", bottom: "50px", background: "white", padding: "5px", display: "flex", gap: "5px", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" },
  colorPicker: { marginLeft: "5px", border: "none", backgroundColor: "transparent", cursor: "pointer" }
};

export default Whiteboard;
