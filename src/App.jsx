import React, { useState, useRef, useEffect } from "react";
import {
  motion, // eslint-disable-line no-unused-vars
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { userData, pagesConfig } from "./config";
import ProgressBar from "./components/DOM/ProgressBar";
import TemplateRenderer from "./components/DOM/Templates";
import "./styles.css";
import BackgroundModels from "./components/3D/BackgroundModels";
import Test from "./components/Animations/Test.jsx";
import Scroll from "./components/Animations/Scroll.jsx";

export default function App() {
  const [speed, setSpeed] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const containerRef = useRef(null);

  // Rendering trick to hide background models momentarily 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Use container instead of target to track scroll progress WITHIN the container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: false,
  });

  // Transform scroll progress to active page index
  // Map scroll progress (0-1) to page indices (0 to pagesConfig.length-1)
  const activePage = useTransform(scrollYProgress, (latest) => {
    const index = Math.round(latest * (pagesConfig.length - 1));
    return Math.min(Math.max(index, 0), pagesConfig.length - 1);
  });

  // Subscribe to activePage changes and update state
  useMotionValueEvent(activePage, "change", (latest) => {
    setCurrentPage(latest);
  });

  return (
    <>
      <ProgressBar total={pagesConfig.length} current={currentPage} />

      <main
        ref={containerRef}
        className="scroll-container"
        style={{ position: "relative" }}
      >
        {pagesConfig.map((page, index) => (
          <motion.section key={page.id} className="section">
            <div className="container mx-auto px-6 relative z-10">
              <TemplateRenderer
                config={page}
                data={userData}
                isActive={index === currentPage}
              />
            </div>
          </motion.section>
        ))}
      </main>

      {/* Visual separator layer with transparent effect */}
      <div className="separator-layer"></div>

      {/* <Test /> */}

      <div
        className={`background-models-wrapper ${
          showBackground ? "visible" : ""
        }`}
      >
        <BackgroundModels speed={speed} />
      </div>
      <Scroll scrollYProgress={scrollYProgress} />

      <input
        key="speed-control"
        className="speed-control"
        type="range"
        min="0"
        max="25"
        value={speed}
        step="0.1"
        onChange={(e) => setSpeed(e.target.value)}
      />
    </>
  );
}
