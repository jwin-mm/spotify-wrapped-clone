import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Animation variants for consistency
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const StatBig = ({ title, value, subtitle, theme }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeInUp}
    className="text-center"
    style={{ color: theme === "dark" ? "#6B4E00" : "#1a1a1a" }}
  >
    <h2 className="text-2xl uppercase tracking-widest mb-4 opacity-80 whitespace-pre-line">
      {title}
    </h2>
    <div className="text-9xl font-bold mb-2" style={{ color: "#8B6914" }}>
      {value}
    </div>
    <p className="text-xl font-light whitespace-pre-line">{subtitle}</p>
  </motion.div>
);

const SplitRight = ({ title, value, subtitle, theme }) => (
  <div className="w-full max-w-4xl flex justify-between items-center px-10">
    <div className="w-1/2" /> {/* Spacer for 3D element */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      className="w-1/2 text-center"
      style={{ color: theme === "dark" ? "#6B4E00" : "#1a1a1a" }}
    >
      <h1 className="text-6xl font-bold mb-4">{value}</h1>
      <h3 className="text-3xl text-[var(--gold)] whitespace-pre-line">
        {title}
      </h3>
      <p className="mt-4 opacity-70 whitespace-pre-line">{subtitle}</p>
    </motion.div>
  </div>
);

// Main Component that selects the layout
const TemplateRenderer = ({ config, data }) => {
  const value = data[config.dataKey] || "";

  switch (config.type) {
    case "stat-big":
      return <StatBig {...config} value={value} />;
    case "split-right":
      return <SplitRight {...config} value={value} />;
    default:
      return <StatBig {...config} value={value} />;
  }
};

export default TemplateRenderer;
