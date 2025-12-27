import { useTransform, useSpring, motion } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function Scroll({ scrollYProgress }) {
  // Create a spring-animated version of scroll progress for smooth, eased effect
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Transform the spring-animated scroll progress to path length (0 to 1)
  const pathLength = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <motion.svg
        className="w-full h-full"
        viewBox="-30 0 860 200"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          style={{ pathLength }}
          transition={{
            delay: 0.2,
            ease: "easeInOut",
          }}
          strokeWidth={3}
          stroke="black"
          fill="none"
          d="M -20 100 C 20 140 45 60 150 -20 C 125 160 140 45 209 45 C 220 145 235 130 136 149 C 295 10 315 165 304 386 C 395 15 410 140 450 85 C 490 30 505 175 545 100 C 585 25 600 155 810 282 C 680 5 695 145 700 164 C 775 75 790 125 914 444"
        />
      </motion.svg>
    </div>
  );
}
