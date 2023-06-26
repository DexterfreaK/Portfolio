import "./App.css";

import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      className="home_container"
      animate={{
        y: [1000, 0, 0],
      }}
      transition={{
        duration: 1.5,
      }}
    >
      <motion.div
        className="home"
        animate={{
          scale: [1, 1, 0.97],
          borderRadius: ["0px", "0px", "15px"],
          backgroundPosition: ["40% 20%", "99% 99%", "99% 40%", "40% 20%"],
        }}
        transition={{
          backgroundPosition: {
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          },
          duration: 1.5,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

export default App;
