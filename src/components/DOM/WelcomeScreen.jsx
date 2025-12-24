import React, { useEffect, useState } from "react";
import "./WelcomeScreen.css";

export default function WelcomeScreen({ onDismiss }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const autoTimer = setTimeout(() => {
      handleDismiss();
    }, 10000);

    // Event listeners for user interaction
    const handleInteraction = () => {
      handleDismiss();
    };

    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("wheel", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const handleDismiss = () => {
    setFadeOut(true);
    // Wait for fade animation to complete before calling onDismiss
    setTimeout(() => {
      onDismiss();
    }, 800);
  };

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
      }}
    />
  ));

  return (
    <div className={`welcome-screen ${fadeOut ? "fade-out" : ""}`}>
      {/* Animated background layers */}
      <div className="bg-gradient-1"></div>
      <div className="bg-gradient-2"></div>
      <div className="bg-gradient-3"></div>

      {/* Particles */}
      <div className="particles-container">{particles}</div>

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
