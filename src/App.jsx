import React, { useState, useRef, useEffect, useCallback } from "react";
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
import Scroll from "./components/Animations/ScrollSquiggle.jsx";

// Constants
const BACKGROUND_DELAY_MS = 1500;
const SCROLL_END_DELAY_MS = 150;
const TOTAL_PAGES = pagesConfig.length;

export default function App() {
  const [speed, setSpeed] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // ------------------------ Handle Animation play/stop from Scroll ------------------------
  // ------------------------- START -------------------------------

  // Clear scroll timer helper
  const clearScrollTimer = useCallback(() => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  }, []);

  // Mark scrolling as stopped after delay
  const markScrollingStopped = useCallback(() => {
    clearScrollTimer();
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
      scrollTimerRef.current = null;
    }, SCROLL_END_DELAY_MS);
  }, [clearScrollTimer]);

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      markScrollingStopped();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    // Use scrollend event if supported for better performance
    if ("onscrollend" in container) {
      container.addEventListener("scrollend", markScrollingStopped, {
        passive: true,
      });
    }

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if ("onscrollend" in container) {
        container.removeEventListener("scrollend", markScrollingStopped);
      }
      clearScrollTimer();
    };
  }, [markScrollingStopped, clearScrollTimer]);

  // ------------------------ END ------------------------

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: false,
  });

  // Transform scroll progress to active page index
  const activePage = useTransform(scrollYProgress, (latest) => {
    const index = Math.round(latest * (TOTAL_PAGES - 1));
    return Math.max(0, Math.min(index, TOTAL_PAGES - 1));
  });

  // Update current page when active page changes
  useMotionValueEvent(activePage, "change", setCurrentPage);

  // Initialize background 3d models visibility with delay
  useEffect(() => {
    const timer = setTimeout(
      () => setShowBackground(true),
      BACKGROUND_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ProgressBar total={TOTAL_PAGES} current={currentPage} />

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
                isActive={index === currentPage && !isScrolling}
              />
            </div>
          </motion.section>
        ))}
      </main>

      {/* Layer separating foreground animations and background models */}
      <div className="separator-layer" />

      {/* Background Models - 3D models floating in the background */}
      <div
        className={`background-models-wrapper ${
          showBackground ? "visible" : ""
        }`}
      >
        <BackgroundModels speed={currentPage} />
      </div>

      {/* Scroll Squiggle - Animated line indicating scroll progress */}
      <Scroll scrollYProgress={scrollYProgress} />


      {/* Uncomment this to add a speed control input */}
      {/* <input
        key="speed-control"
        className="speed-control"
        type="range"
        min="0"
        max="25"
        value={speed}
        step="0.1"
        onChange={(e) => setSpeed(e.target.value)}
      /> */}
    </>
  );
}
