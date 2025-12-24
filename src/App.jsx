import React, { useState, useRef } from "react";
import { userData, pagesConfig } from "./config";
import ProgressBar from "./components/DOM/ProgressBar";
import TemplateRenderer from "./components/DOM/Templates";
import WelcomeScreen from "./components/DOM/WelcomeScreen";
import "./styles.css";
import BackgroundModels from "./components/3D/BackgroundModels";

export default function App() {
  const [activePage, setActivePage] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef();

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPos = containerRef.current.scrollTop;
    const height = window.innerHeight;
    const index = Math.round(scrollPos / height);
    if (index !== activePage) setActivePage(index);
  };

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen onDismiss={() => setShowWelcome(false)} />
      ) : (
        <>
          <ProgressBar total={pagesConfig.length} current={activePage} />

          <main
            ref={containerRef}
            className="scroll-container"
            onScroll={handleScroll}
            style={{ position: "relative" }}
          >
            {pagesConfig.map((page, index) => (
              <section key={page.id} className="section">
                <div className="container mx-auto px-6 relative z-10">
                  <TemplateRenderer
                    config={page}
                    data={userData}
                    isActive={index === activePage}
                  />
                </div>
              </section>
            ))}
          </main>

          <BackgroundModels speed={speed} />

          <input
            className="speed-control"
            type="range"
            min="0"
            max="50"
            value={speed}
            step="0.1"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </>
      )}
    </>
  );
}
