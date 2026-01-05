import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { userData, pagesConfig } from "./config";
import ProgressBar from "./components/DOM/ProgressBar";
import TemplateRenderer from "./components/DOM/Templates";
import "./styles.css";
import BackgroundModels from "./components/3D/BackgroundModels";

// Constants
const BACKGROUND_DELAY_MS = 1500;
const TOTAL_PAGES = pagesConfig.length;

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const containerRef = useRef(null);

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
        className="scroll-container-smooth"
        style={{ position: "relative" }}
      >
        {/* Road 1 - Draws on pages 1-2, then scrolls away */}
        <div style={{ 
          position: "absolute", 
          top: "150vh", 
          left: 0, 
          width: "100%", 
          height: "300vh", 
          zIndex: 5, 
          pointerEvents: "none" 
        }}>
          <motion.svg
            style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}
            viewBox="-800 -400 3200 2000"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path
              style={{ 
                pathLength: 1  // Set to 1 for testing - shows full road
              }}
              d="M -800 600 Q 400 400 1200 700 Q 2000 1000 2400 600"
              strokeWidth={40}
              stroke="#2a2a2a"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M -800 600 Q 400 400 1200 700 Q 2000 1000 2400 600"
              strokeWidth={35}
              stroke="#5a5a5a"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M -800 600 Q 400 400 1200 700 Q 2000 1000 2400 600"
              strokeWidth={3.5}
              stroke="#FFD700"
              strokeLinecap="round"
              strokeDasharray="30 30"
              fill="none"
            />
          </motion.svg>
        </div>

        {/* Road 2 - Draws on pages 4-5, then scrolls away */}
        <div style={{ 
          position: "absolute", 
          top: "600vh", 
          left: 0, 
          width: "100%", 
          height: "300vh", 
          zIndex: 5, 
          pointerEvents: "none" 
        }}>
          <motion.svg
            style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}
            viewBox="-800 -400 3200 2000"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M 2000 500 Q 1200 700 600 600 Q 0 500 -400 800 Q -800 1100 400 1200"
              strokeWidth={40}
              stroke="#2a2a2a"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M 2000 500 Q 1200 700 600 600 Q 0 500 -400 800 Q -800 1100 400 1200"
              strokeWidth={35}
              stroke="#5a5a5a"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M 2000 500 Q 1200 700 600 600 Q 0 500 -400 800 Q -800 1100 400 1200"
              strokeWidth={3.5}
              stroke="#FFD700"
              strokeLinecap="round"
              strokeDasharray="30 30"
              fill="none"
            />
          </motion.svg>
        </div>

        {/* Road 3 - Draws on pages 7-8 */}
        <div style={{ 
          position: "absolute", 
          top: "1050vh", 
          left: 0, 
          width: "100%", 
          height: "300vh", 
          zIndex: 5, 
          pointerEvents: "none" 
        }}>
          <motion.svg
            style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}
            viewBox="-800 -400 3200 2000"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M -600 400 Q 400 300 1000 500 Q 1600 700 1400 1000 Q 1200 1300 600 1100"
              strokeWidth={40}
              stroke="#2a2a2a"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M -600 400 Q 400 300 1000 500 Q 1600 700 1400 1000 Q 1200 1300 600 1100"
              strokeWidth={35}
              stroke="#5a5a5a"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              style={{ 
                pathLength: 1
              }}
              d="M -600 400 Q 400 300 1000 500 Q 1600 700 1400 1000 Q 1200 1300 600 1100"
              strokeWidth={3.5}
              stroke="#FFD700"
              strokeLinecap="round"
              strokeDasharray="30 30"
              fill="none"
            />
          </motion.svg>
        </div>

        {pagesConfig.map((page, index) => {
          // Calculate scroll-based animation ranges for this section
          const sectionStart = index / TOTAL_PAGES;
          const sectionMid = (index + 0.5) / TOTAL_PAGES;
          const sectionEnd = (index + 1) / TOTAL_PAGES;
          
          // Opacity: fade in as approaching, fade out as leaving
          // Special case: first page starts fully visible
          const opacity = useTransform(
            scrollYProgress,
            index === 0
              ? [0, 0.1, sectionEnd - 0.05, Math.min(1, sectionEnd + 0.15)]
              : [
                  Math.max(0, sectionStart - 0.15),
                  sectionStart + 0.05,
                  sectionEnd - 0.05,
                  Math.min(1, sectionEnd + 0.15)
                ],
            index === 0
              ? [1, 1, 1, 0]
              : [0, 1, 1, 0]
          );

          // Y position: smooth parallax effect
          // First page stays fixed at center, others get parallax
          const y = index === 0 
            ? 0  // No movement for first page
            : useTransform(
                scrollYProgress,
                [sectionStart - 0.1, sectionMid, sectionEnd + 0.1],
                [100, 0, -100]
              );

          // Scale: subtle zoom effect
          // First page stays at full scale - no shrinking
          const scale = index === 0
            ? 1  // Always full scale for first page
            : useTransform(
                scrollYProgress,
                [sectionStart, sectionMid, sectionEnd],
                [0.95, 1, 0.95]
              );

          return (
            <motion.section
              key={page.id}
              className="section-tall"
              style={{
                opacity,
                y,
                scale,
              }}
            >
              <div className="container mx-auto px-6 relative z-10">
                <TemplateRenderer
                  config={page}
                  data={userData}
                  isActive={true}
                />
              </div>
            </motion.section>
          );
        })}
      </main>

      {/* Layer separating foreground animations and background models */}
      <motion.div 
        className="separator-layer"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.15],
            [0, 1]
          ),
        }}
      />

      {/* Background Models - 3D models floating in the background */}
      <div
        className={`background-models-wrapper ${
          showBackground ? "visible" : ""
        }`}
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.15, 0.3],
            [0, 0, 1]
          ),
        }}
      >
        <BackgroundModels speed={currentPage * 0.3} />
      </div>
    </>
  );
}