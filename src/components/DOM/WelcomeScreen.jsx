import React from "react";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      {/* Animated background layers */}
      <div className="bg-gradient-1"></div>
      <div className="bg-gradient-2"></div>
      <div className="bg-gradient-3"></div>

      {/* Content */}
      <div className="welcome-content">
        <h1 className="welcome-title">
          <span className="title-line">Welcome to</span>
          <span className="title-line highlight">Kittelson Wrapped</span>
          <span className="title-line year">2025</span>
        </h1>

        <p className="welcome-subtitle">Scroll to continue</p>

        {/* Animated scroll indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-down"></div>
        </div>
      </div>
    </div>
  );
}
