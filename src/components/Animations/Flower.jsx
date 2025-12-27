import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function Flower({ isActive = true }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: "80%",
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >

          {/* Main Flower Drawing */}
          <motion.svg
            className="w-full h-full"
            viewBox="-30 0 860 200"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              animate={{ pathLength: [0, 1] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeatDelay: 0,
              }}
              strokeWidth={3}
              stroke="black"
              fill="none"
              d="M 50,10 
             C 60,15 65,25 60,35
             C 70,30 80,35 80,45
             C 75,55 65,55 55,50
             C 60,60 60,70 50,75
             C 40,70 40,60 45,50
             C 35,55 25,55 20,45
             C 20,35 30,30 40,35
             C 35,25 40,15 50,10
             "
            />
          </motion.svg>
          
          {/* Animated Radial Lines */}
          <motion.svg
            className="w-full h-full"
            viewBox="-30 0 860 200"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                repeatDelay: 0,
                repeat: Infinity,
                repeatType: "loop",
                delay: 3,
              }}
              strokeWidth={3}
              stroke="black"
              fill="none"
              d="M 67 22 L 81 5 M 50 5 L 50 -14 M 27 19 L 15 2"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
