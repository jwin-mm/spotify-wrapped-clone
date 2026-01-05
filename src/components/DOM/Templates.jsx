import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Import animation components
import WelcomeScreen from "./WelcomeScreen";
import Flower from "../Animations/Flower";

// Animation component mapping
const animationComponents = {
  Flower: Flower,
};

// Animation variants for consistency
const fadeInUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0,
      ease: "easeOut",
      delay: 0
    } 
  },
};

// Helper function to format time values (seconds to hours)
const formatTimeValue = (seconds) => {
  if (typeof seconds !== "number") return seconds;
  const hours = Math.round(seconds / 3600);
  return `${hours}h`;
};

// Content Renderers - Modular components for each content type
const ContentStat = ({ dataKey, label, data }) => {
  const value = data[dataKey];
  return (
    <div className="my-4">
      {label && (
        <p
          className="text-sm uppercase tracking-wider opacity-70 mb-1"
          style={{ fontWeight: 500 }}
        >
          {label}
        </p>
      )}
      <div
        className="text-6xl font-bold"
        style={{ color: "#000000", fontWeight: 800 }}
      >
        {value}
      </div>
    </div>
  );
};

const ContentText = ({ text, data }) => {
  const displayText = typeof text === "function" ? text(data) : text;
  return (
    <p
      className="text-xl my-4 whitespace-pre-line"
      style={{ fontWeight: 400, lineHeight: 1.6 }}
    >
      {displayText}
    </p>
  );
};

const ContentTable = ({ nameKey, valueKey, tableTitle, data }) => {
  const names = data[nameKey] || [];
  const values = data[valueKey] || [];

  // Pair up names and values
  const rows = names.map((name, index) => ({
    name,
    value: values[index],
    rank: index + 1,
  }));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      className="my-8 w-full max-w-2xl mx-auto"
    >
      {tableTitle && (
        <h3
          className="text-2xl mb-4 text-center"
          style={{ color: "#000000", fontWeight: 800 }}
        >
          {tableTitle}
        </h3>
      )}
      <div className="backdrop-blur-sm bg-black/10 rounded-2xl p-6 shadow-lg flex flex-col items-center">
        <div className="space-y3 flex flex-col items-start">
          {rows.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-6 py-3 px-4 rounded-lg hover:bg-black/5 transition-all"
            >
              <span
                className="text-sm opacity-50 min-w-[2rem]"
                style={{ color: "#000000", fontWeight: 700 }}
              >
                #{row.rank}
              </span>
              <span className="text-lg" style={{ fontWeight: 500 }}>
                {row.name}
              </span>
              <span
                className="text-xl tabular-nums"
                style={{ color: "#000000", fontWeight: 700 }}
              >
                ({formatTimeValue(row.value)})
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Render content array for a page
const renderContent = (content, data) => {
  if (!content || !Array.isArray(content)) return null;

  return content.map((item, index) => {
    switch (item.type) {
      case "stat":
        return <ContentStat key={index} {...item} data={data} />;
      case "text":
        return <ContentText key={index} {...item} data={data} />;
      case "table":
        return <ContentTable key={index} {...item} data={data} />;
      default:
        return null;
    }
  });
};

const Intro = ({ title, content, data }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeInUp}
    className="intro-section"
  >
    <h1
      style={{
        fontWeight: 900,
        fontSize: "5rem",
        marginBottom: "2rem",
        textTransform: "uppercase",
      }}
    >
      {title.replace("NAME", data.Employee)}
    </h1>
    <div className="flex flex-col items-center">
      {renderContent(content, data)}
    </div>
  </motion.div>
);

const Outro = ({ title, content, data }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeInUp}
    className="outro-section"
  >
    <h1 style={{ fontWeight: 900, fontSize: "4rem", marginBottom: "2rem" }}>
      {title}
    </h1>
    <div className="flex flex-col items-center">
      {content.map((item, index) => {
        if (item.type === "text") {
          const displayText =
            typeof item.text === "function" ? item.text(data) : item.text;
          return (
            <p
              key={index}
              className="text-2xl my-4 whitespace-pre-line"
              style={{ fontWeight: 300, lineHeight: 1.8 }}
            >
              {displayText.replace("NAME", data.Employee)}
            </p>
          );
        }
        return null;
      })}
    </div>
  </motion.div>
);

const SplitRight = ({ title, content, data }) => (
  <div className="w-full max-w-4xl flex justify-between items-center px-10">
    <div className="w-1/2" /> {/* Spacer for 3D element */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      className="w-1/2 text-center"
      style={{ color: "#000000" }}
    >
      <h3
        className="text-3xl mb-4"
        style={{ fontWeight: 800, color: "#000000" }}
      >
        {title}
      </h3>
      {renderContent(content, data)}
    </motion.div>
  </div>
);

const SplitLeft = ({ title, content, data }) => (
  <div className="w-full max-w-4xl flex justify-between items-center px-10">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      className="w-1/2 text-center"
      style={{ color: "#000000" }}
    >
      <h3
        className="text-3xl mb-4"
        style={{ fontWeight: 800, color: "#000000" }}
      >
        {title}
      </h3>
      {renderContent(content, data)}
    </motion.div>
    <div className="w-1/2" /> {/* Spacer for 3D element */}
  </div>
);

const StatCenter = ({ title, content, data }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeInUp}
    className="text-center max-w-4xl mx-auto"
    style={{ color: "#000000" }}
  >
    <h2 className="text-3xl mb-6" style={{ fontWeight: 800, opacity: 0.95 }}>
      {title}
    </h2>
    <div className="flex flex-col items-center">
      {renderContent(content, data)}
    </div>
  </motion.div>
);

const Welcome = () => <WelcomeScreen />;

// Animation Renderer Component
const AnimationRenderer = ({ animations, isActive }) => {
  if (!animations || !Array.isArray(animations) || animations.length === 0) {
    return null;
  }

  return (
    <>
      {animations.map((animationName, index) => {
        const AnimationComponent = animationComponents[animationName];
        if (!AnimationComponent) {
          console.warn(`Animation component "${animationName}" not found`);
          return null;
        }
        return (
          <AnimationComponent key={`animation-${index}`} isActive={isActive} />
        );
      })}
    </>
  );
};

// Main Component that selects the layout
const TemplateRenderer = ({ config, data, isActive }) => {
  // Check if this is the outro page (Final Thoughts)
  const isOutro = config.title === "Final Thoughts";

  const renderLayout = () => {
    switch (config.type) {
      case "welcome":
        return <Welcome {...config} data={data} />;
      case "intro":
        return <Intro {...config} data={data} />;
      case "split-right":
        return isOutro ? (
          <Outro {...config} data={data} />
        ) : (
          <SplitRight {...config} data={data} />
        );
      case "split-left":
        return <SplitLeft {...config} data={data} />;
      case "stat-center":
        return <StatCenter {...config} data={data} />;
      default:
        return <StatCenter {...config} data={data} />;
    }
  };

  return (
    <>
      {renderLayout()}
      <AnimationRenderer animations={config.animations} isActive={isActive} />
    </>
  );
};

export default TemplateRenderer;