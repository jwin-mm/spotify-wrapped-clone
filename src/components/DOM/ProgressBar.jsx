import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ProgressBar({ total, current }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div
      className="fixed top-0 left-0 w-full bg-gray-800"
      style={{ zIndex: 9999, height: "4px" }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <motion.div
        className="h-full"
        style={{ backgroundColor: "var(--gold)" }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
    </div>
  );
}
