import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Shared/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
