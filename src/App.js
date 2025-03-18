// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import Whiteboard from "./components/Whiteboard";
// import Home from "./components/Home";
// import Join from "./components/Join";
// import Templates  from "./components/Templates";
// import "./App.css"; // Keep styles if needed

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/whiteboard" element={<Whiteboard />} />
//           <Route path="/templates" element={<Templates />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/join" element={<Join />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Join from "./components/Join";
import Whiteboard from "./components/Whiteboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/whiteboard/:roomId" element={<Whiteboard />} /> {/* ✅ Fix: Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
